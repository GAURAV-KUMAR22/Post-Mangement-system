import axios from "axios";


const InstanceUrl = axios.create({
    baseURL: 'http://localhost:5000/api/auth/',
    timeout: 50000, // Increased timeout to prevent errors
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

export default InstanceUrl;