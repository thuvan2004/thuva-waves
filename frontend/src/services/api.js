import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Every request-ல token automatically add பண்றது
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// Auth APIs
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Ride APIs
export const requestRide = (data) => API.post('/rides', data);
export const getRideHistory = () => API.get('/rides/history');
export const cancelRide = (id) => API.put(`/rides/${id}/cancel`);

// Driver APIs
export const updateDriverStatus = (data) => API.put('/drivers/status', data);
export const getEarnings = () => API.get('/drivers/earnings');

// Admin APIs
export const getDashboardStats = () => API.get('/admin/stats');
export const getAllUsers = () => API.get('/admin/users');
export const approveDriver = (id) => API.put(`/admin/drivers/${id}/approve`);

export default API;