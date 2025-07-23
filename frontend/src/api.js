import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Your Spring Boot backend URL
    // You can add headers here if needed
});

export default api;