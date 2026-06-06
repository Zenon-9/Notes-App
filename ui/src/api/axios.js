import axios from 'axios';

const API_URI = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URI
});

export default api;