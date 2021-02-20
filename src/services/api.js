
//import { create } from 'apisauce';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.9:3000'
});

/*if(api.ok) 
    console.log ('Ok!');

api.addResponseTransform(response => {
    if(!response.ok) throw response;
});*/

export default api;

//localhost padrão: 10.0.3.2
//eu: 192.168.1.9