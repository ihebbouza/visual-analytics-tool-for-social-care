import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { getAccessTokenFromLocalStorage } from './localStorage';
import { refreshToken } from './auth';
const customFetch = axios.create({
    baseURL: 'http://localhost:5000',
});

customFetch.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log("Interceptor error:", error); // Log the initial error

        const originalRequest = error.config;

        if (
            (error.response.status === 401 || error.response.status === 403) &&
            !originalRequest._retry
        ) {
            console.log("Attempting to refresh token and retry request...");
            originalRequest._retry = true;
            
            await refreshToken();
            originalRequest.headers.Authorization = `Bearer ${getAccessTokenFromLocalStorage()}`;
            console.log('debugging', originalRequest.headers.Authorization)
            console.log("Retrying request with new token:", originalRequest); // Log the retried request
            return customFetch(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default customFetch;