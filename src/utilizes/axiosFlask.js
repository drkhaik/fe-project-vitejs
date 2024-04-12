import axios from "axios";
import { message } from 'antd';

const baseURL = import.meta.env.VITE_APP_BACKEND_FLASK_URL;
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    const status = error?.response?.status || 500;
    switch (status) {
        case 401: {
            return Promise.reject(error);
        }
        case 403: {
            message.error("Permission denied!");
            return Promise.reject(error);
        }
        case 400: {
            return Promise.reject(error);
        }
        case 404: {
            return Promise.reject(error);
        }
        case 409: {
            return Promise.reject(error);
        }
        case 422: {
            return Promise.reject(error);
        }
        case 500: {
            message.error("Server not response!");
            return Promise.reject(error);
        }
        default: {
            return Promise.reject(error);
        }
    }
});

export default instance;