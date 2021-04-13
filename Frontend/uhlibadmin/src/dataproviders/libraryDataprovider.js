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
        const url = `${apiUrl}/${resource}/filter?${stringify(query)}`;
        //const url = `${apiUrl}/${resource}/all_libraries`;
        return httpClient(url).then(({ headers, json }) => ({
            data: json.map(resource => ({ ...resource, id: resource.library_id }) ),
            total:10
        }));
    },

    /*getOne: async (resource, params) => {
        const url = `${apiUrl}/${resource}/id/${params.id}`
        const res  = await fetch(url)
        var json = await res.json()
        var arr = [{id:json.data[0].library_id,
            location:json.data[0].location,
            name:json.data[0].name,
            opening_hours:json.data[0].opening_hours}];
        console.log(arr)
        const newJson = arr.map(({ 
            library_id: id, ...rest}) => ({
                id,
                ...rest
            })); 
        return {data:arr[0]}
    }, 
    
    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}/many?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ 
            data: json.map(resource => ({ ...resource, id: resource.library_id }) )
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
            total:10
        }));
    },

    update: async (resource, params) =>{
        console.log(params)
        //var arr = params.data
         httpClient(`${apiUrl}/${resource}/updatelibrary`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }))
        return {data: params}
        ///${params.id}
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
        return httpClient(`${apiUrl}/${resource}/createlibrary`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }))
    },

    delete: (resource, params) =>{
        console.log(params)
        return httpClient(`${apiUrl}/${resource}/deletelibrary/${params.id}`, {
            method: 'DELETE',
        }).then((value) => {console.log(value) })
    },
    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: {json} }));
    }
};

