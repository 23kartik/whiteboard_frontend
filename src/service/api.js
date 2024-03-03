import axios from 'axios';

const API_BASE_URL = 'https://whiteboard-backend-m760.onrender.com/'; // Replace with your actual backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Include the JWT token for authentication
  },
});

export default api;
