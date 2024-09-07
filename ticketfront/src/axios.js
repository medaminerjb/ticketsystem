// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/', // Replace with your Django API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
