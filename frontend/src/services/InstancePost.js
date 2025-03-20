import axios from "axios";

export const InstanceUrlPost = axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 10000, // Increased timeout to prevent errors
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// ✅ Interceptor to dynamically add the latest token
InstanceUrlPost.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token'); // Get the latest token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
InstanceUrlPost.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken"); // Get token from storage
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


