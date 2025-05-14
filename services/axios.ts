import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
});

// Interceptor para adicionar o token automaticamente
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepta respostas com erro
api.interceptors.response.use(
    response => response,
    (error) => {
        const status = error.response?.status;
        const data = error.response?.data;

        // Lógica de redirecionamento para erros de autenticação
        if (status === 401 || status === 403) {
            Cookies.remove('token');
            Router.push('/login');
        }

        // Pega a mensagem customizada do backend
        let message = 'Erro inesperado';

        if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
            message = data.errors[0].message;
        } else if (typeof data?.error === 'string') {
            message = data.error;
        } else if (typeof data?.message === 'string') {
            message = data.message;
        }

        return Promise.reject(new Error(message));
    }
);


export default api;
