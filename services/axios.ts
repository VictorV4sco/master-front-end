import axios from 'axios';
import Cookies from 'js-cookie';
import router from 'next/router';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Depois de cada resposta, intercepta erros
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            Cookies.remove('token'); // Remove token inválido
            router.push('/login');   // Redireciona pro login
        }
        return Promise.reject(error);
    }
);

export default api;
