// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_ADDRESS,
  // Replace with your Django API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
