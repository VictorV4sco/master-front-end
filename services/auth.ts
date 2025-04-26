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

    const basicAuth = Buffer.from(`myclientid:myclientsecret`).toString('base64');

    const response = await api.post('/oauth2/token', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${basicAuth}`,
        },
    });
    //Se tirar do comentario da pau
    //const { access_token } = response.data;

    //Cookies.set('token', access_token, { expires: 1 }); // 1 dia de validade

    return response.data;
}
