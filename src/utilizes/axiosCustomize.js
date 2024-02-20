import axios from "axios";
import { message, notification } from 'antd';

// const mutex = new Mutex();

const baseURL = import.meta.env.VITE_BACKEND_URL;
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

// instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`;

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error?.response?.status || 500;
    switch (status) {
        // authentication (token related issues)
        case 401: {
            // console.log("check log", error.response.data);
            // return error.response.data;
            return Promise.reject(error);
        }
        // forbidden (permission related issues)
        case 403: {
            message.error("Permission denied!");
            return Promise.reject(error);
        }
        // bad request
        case 400: {
            return Promise.reject(error);
        }
        // not found
        case 404: {
            return Promise.reject(error);
        }
        // conflict
        case 409: {
            return Promise.reject(error);
        }
        // unprocessable
        case 422: {
            return Promise.reject(error);
        }
        case 500: {
            message.error("Server not response!");
            return Promise.reject(error);
        }
        // generic api error (server related) unexpected
        default: {
            return Promise.reject(error);
        }
    }
});

export default instance;