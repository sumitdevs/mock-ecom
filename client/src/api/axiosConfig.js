import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/api',
});