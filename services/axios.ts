import axios from 'axios';
import Cookies from 'js-cookie';
import { cookies } from 'next/headers';
import router from 'next/router';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
});

export default api;
