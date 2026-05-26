//frontend/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// tự động gắn token
api.interceptors.request.use((config) => {
  const isCustomerApi = config.url.includes("/customer");

  if (!isCustomerApi) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
