import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrf_access_token');
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }
  return config;
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}