import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

// const apiUrl = 'http://localhost:5000/api';
const apiUrl = 'https://uhlib.cc/api';
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        // const url = `${apiUrl}/${resource}?${stringify(query)}`;
        var url = `${apiUrl}/users/allusers`;

        switch (resource) {
            case 'notifications': {
                url = `${apiUrl}/notifications`;
                break;
            }
            case 'items': {
              url = `${apiUrl}/items/allitems`;
              break;
            }
            case 'libraries': {
                url = `${apiUrl}/libraries/all_libraries`;
                break;
            }
            case 'employees': {
                url = `${apiUrl}/employees/`;
                break;
            }
            case 'books': {
                url = `${apiUrl}/items?sort=["title","ASC"]&range=[0, 5000]&filter={"item_type":"Book"}`;
                break;
            }
            case 'printer': {
                url = `${apiUrl}/items?sort=["title","ASC"]&range=[0, 5000]&filter={"item_type":"Printer"}`;
                break;
            }
            case 'media': {
                url = `${apiUrl}/items?sort=["title","ASC"]&range=[0, 5000]&filter={"item_type":"Media"}`;
                break;
            }
        }
        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            // data: json.map(resource => ({ ...resource, id: resource.user_id }) ),
            // total: parseInt(headers.get('Content-Range').split('/').pop(), 10),
            total: 10,
        }));
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
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
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

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
        httpClient(`${apiUrl}/${resource}`, {
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