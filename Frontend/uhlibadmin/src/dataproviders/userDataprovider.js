import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { responsiveFontSizes } from '@material-ui/core';

const apiUrl = 'http://localhost:5000/api';
const httpClient = fetchUtils.fetchJson;

export default {
    getList:  async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        // We cna change the sort here 
        // console.log(query)
        // params["sort"]["field"] ="first_name"
        // console.log(params)
        const url = `${apiUrl}/${resource}/allusers`;
        return  httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('Content-Range')), // 0-10/10
            // total: [0,9],
        }));
        
    },

    getOne: async (resource, params) => {
        let url = `${apiUrl}/${resource}/${params.id}`
        const response = await fetch (url)
        const json = await response.json()
        return {data: json}
    },

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}/many?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json.map(resource => ({ ...resource, id: resource.user_id }) ), }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        // console.log("query", query)
        // const url = `${apiUrl}/${resource}/${params.id}`;
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        console.log(url)
        return httpClient(url).then(({ headers, json }) => ({
            data: [json],
            total:10
        }));
    },

    update: async(resource, params) =>{
        let url = `${apiUrl}/${resource}/${params.id}`
        console.log(params.data)
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }))
    },

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/createuser`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    }
};