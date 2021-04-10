import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'https://uhlib.cc/api';
// const apiUrl = 'http://localhost:5000/api';
const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const { token } = JSON.parse(localStorage.getItem('access_token'));
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

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

    // getOne:  (resource, params) => {
    //     const url = `${apiUrl}/${resource}/one/${params.id}`
    //     var json = await res.json()
    //     // json[0]["id"] = json[0]["transaction_id"]
    //     console.log("data", json[0])
    //     var json = json.map(resource => ({ ...resource, id: resource.transaction_id }) ) 
    //     return {data:json[0]}
    // }, 
    //     
    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/one/${params.id}`).then(({ json }) => ({
            data: json.map(resource => ({ ...resource, id: resource.transaction_id }))[0],
    })),

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
        console.log(params)
        // get the loan item title from  
        // get the item id from loan item first 
        // GET http://my.api.url/posts?filter={"author_id":345}
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

