import api from '@/services/axios';
import qs from 'qs';
import Cookies from 'js-cookie';

interface LoginData {
    username: string;
    password: string;
}

export async function login({ username, password }: LoginData) {
    const data = qs.stringify({
        grant_type: 'password',
        username: username,
        password: password,
    });

    const basicAuth = btoa(`myclientid:myclientsecret`);

    const response = await api.post('/oauth2/token', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${basicAuth}`,
        },
    });

    Cookies.set('token', response.data.access_token, { expires: 1 }); // 1 dia de validade

    return response.data;
}