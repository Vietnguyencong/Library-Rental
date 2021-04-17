import axios from 'axios';

axios.interceptors.request.use(config =>{
    if(!config.headers.Authorization){
      const user = JSON.parse(localStorage.getItem('user'));
      if(user){
        config.headers.Authorization = 'Bearer ' + user.token;
        console.log('token is', user.token);
      }
    }
    return config;
  }, err => {Promise.reject(err)})

export default axios