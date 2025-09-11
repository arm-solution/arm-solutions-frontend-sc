import axios from "axios";
import { getToken } from "../../customs/global/manageLocalStorage";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Request interceptor → attach token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle expired tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // clear storage
      localStorage.removeItem("token");
      localStorage.removeItem("authEmployee");

      // redirect to login
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
