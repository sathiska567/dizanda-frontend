import axios from 'axios';

const baseURL = import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:5000/api';
export const TOKEN_KEY = 'dizanda_admin_token';

export const apiClient = axios.create({ baseURL });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export function getErrorMessage(error) {
  return error?.response?.data?.message || error?.message || 'Something went wrong';
}
