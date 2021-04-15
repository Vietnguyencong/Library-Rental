import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { responsiveFontSizes } from '@material-ui/core';
import { string } from 'prop-types';

const apiUrl = 'https://uhlib.cc/api';
//  const apiUrl = 'http://localhost:5000/api';
// const httpClient = fetchUtils.fetchJson;
const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const { token } = JSON.parse(localStorage.getItem('access_token'));
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};
export default {
    getList:  async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        
        const url = `${apiUrl}/${resource}/all_employees?${stringify(query)}`;
        return  httpClient(url).then(({ headers, json }) => ({
            data: json.map(resource => ({ ...resource, id: resource.employee_id }) ),
            // total: parseInt(headers.get('Content-Range')), // 0-10/10
            // total: [0,9],
            total:10
        }));
        
    },

    // getOne: async (resource, params) => {
    //     let url = `${apiUrl}/${resource}/one/${params.id}`
    //     const response = await fetch (url)
    //     const json = await response.json()
    //     return {data: json}
    // },

    getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/one/${params.id}`).then(({ json }) => ({
        data: json
    })),

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            //sort: JSON.stringify([field, order]),
            sort: JSON.stringify(["first_name","ASC"]),
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
            data: json,
            total:10
        }));
    },

    update: async(resource, params) =>{
        let url = `${apiUrl}/${resource}/update_employee/${params.id}`
        console.log(params.data)
        return httpClient(`${apiUrl}/${resource}/update_employee/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: params.data })) // {data: json}
    }, 

    create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/create_employee`, {
        method: 'POST',
        body: JSON.stringify(params.data),
    }).then(({ json }) => ({
        data: { ...params.data, id: json.id },
    })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/delete_employee`, {
            method: 'DELETE',
            body: JSON.stringify({"id": params.id})
        }).then(({ json }) => ({ data: json })),

};