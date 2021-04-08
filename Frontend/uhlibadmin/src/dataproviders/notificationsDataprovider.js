import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { responsiveFontSizes } from '@material-ui/core';
import { string } from 'prop-types';

//const apiUrl = 'https://uhlib.cc/api';
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
        
        const url = `${apiUrl}/${resource}/allemployeesnotifications?${stringify(query)}`;
        return  httpClient(url).then(({ headers, json }) => ({
            data: json.map(resource => ({ ...resource, id: resource.ID}) ),
            // total: parseInt(headers.get('Content-Range')), // 0-10/10
            // total: [0,9],
            total:10
        }));
        
    },

    getOne: async (resource, params) => {
        let url = `${apiUrl}/${resource}/OneEmployee/${params.id}`
        const response = await fetch (url)
        const json = await response.json()
        return {data: json}
    },

};