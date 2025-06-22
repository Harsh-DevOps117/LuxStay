// src/axios.js or src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ Your backend API
  withCredentials: true, // ✅ IMPORTANT
});

export default api;
