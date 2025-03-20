import axios from "axios";


const InstanceUrl = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
    timeout: 10000, // Increased timeout to prevent errors
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

InstanceUrl.interceptors.request.use(
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

InstanceUrl.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log("Unauthorized! Redirecting to login...");
            window.location.href = "/login"; // Redirect to login page if unauthorized
        }
        return Promise.reject(error);
    }
);
export default InstanceUrl;