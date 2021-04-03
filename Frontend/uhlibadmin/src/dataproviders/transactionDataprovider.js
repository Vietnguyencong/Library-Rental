import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:5000/api';
const httpClient = fetchUtils.fetchJson;

export default {
getList:  (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ headers, json }) => ({
            // data: json,
            data: json.map(resource => ({ ...resource, id: resource.transaction_id }) ),
            // total: parseInt(headers.get('content-range').split('/').pop(), 10),
            total:10
        }));
    },

    getOne: async (resource, params) => {
        const url = `${apiUrl}/${resource}/one/${params.id}`
        const res  = await fetch(url)
        var json = await res.json()
        // json[0]["id"] = json[0]["transaction_id"]
        console.log("data", json[0])
        var json = json.map(resource => ({ ...resource, id: resource.transaction_id }) ) 
        return {data:json[0]}
    }, 
    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}/many?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ 
            data: json.map(resource => ({ ...resource, id: resource.transaction_id }) )
        }));
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
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            // total: parseInt(headers.get('content-range').split('/').pop(), 10),
            total:10
        }));
    },

    update: async (resource, params) =>{
        console.log(params)
         httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }))
        return {data: params}
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

    create: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }))
    },

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

// function rename(obj, oldkey, newkey) { 
//     capitals = capitals.map(function(obj) {
//         obj[newkey] = obj[oldkey]; // Assign new key
//         delete obj[oldkey]; // Delete old key
//         return obj;
//     })
// }