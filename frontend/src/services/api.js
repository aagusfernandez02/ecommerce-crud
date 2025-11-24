import axios from 'axios';
import { toast } from 'vue3-toastify';

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
    baseURL: BASE_URL
});

let token = null;

export const setToken = (newToken) => {
    token = newToken;
}

export const getToken = () => {
    return token;
}

export const login = async (username, password) => {
    let jwt = null;
    try {
        const res = await api.post('/login', {
            username,
            password
        });
        const response_json = res.data;
        jwt = response_json.data.jwt;

    } catch (error) {
        toast.error(error.response.data.data.message);
    }

    if( jwt ) {
        setToken(jwt);
        toast.success("Login exitoso!");
    }

}