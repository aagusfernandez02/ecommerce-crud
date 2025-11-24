import axios from 'axios';
import { toast } from 'vue3-toastify';
import { useUserStore } from '@/stores/user';

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
    let user = null;

    try {
        const res = await api.post('/login', {
            username,
            password
        });
        const response_json = res.data;
        jwt = response_json.data.jwt;
        user = response_json.data.user;

    } catch (error) {
        toast.error(error.response.data.data.message);
        return false;
    }

    const userStore = useUserStore();
    userStore.jwt = jwt;
    userStore.user = user;

    return true;
}