import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { responsiveFontSizes } from '@material-ui/core';
import { string } from 'prop-types';

//const apiUrl = 'https://uhlib.cc/api';
const apiUrl = 'http://localhost:5000/api';

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
        
   
         const url = `${apiUrl}/${resource}/allstocks`;
        //const url = `${apiUrl}/${resource}/getall?${stringify(query)}`
        return  httpClient(url).then(({ headers, json }) => ({
            data: json.map(resource => ({ ...resource, id: resource.title }) ),
            //data:json
            // total: parseInt(headers.get('Content-Range')), // 0-10/10
            // total: [0,9],
            total:10
        }));
        
    },

   
    getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/one/${params.id}`).then(({ json }) => ({
        data: json
    }))
    

    

    
};