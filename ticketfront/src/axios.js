// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_ADDRESS,
  // Replace with your Django API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
