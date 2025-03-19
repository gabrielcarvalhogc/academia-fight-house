/// <reference types="vite/client" />

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
}

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export const apiService = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.get<T>(url, config).then(response => response.data),

    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiClient.post<T>(url, data, config).then(response => response.data),

    put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
        apiClient.put<T>(url, data, config).then(response => response.data),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.delete<T>(url, config).then(response => response.data),
};

export default apiService;