import axios from "axios";
import { VITE_BACKEND_URL } from "../../config/env.js";

// Create axios instance with default config
const api = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Admin authentication service
export const adminService = {
  login: async (credentials) => {
    const response = await api.post("/api/v1/auth/admin", credentials);
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isAuthenticated: () => {
    return Boolean(localStorage.getItem("token"));
  },
};

// Product service
export const productService = {
  getAll: async () => {
    const response = await api.get("/api/v1/products");
    return response.data.products;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/api/v1/products/${id}`);
    return response.data;
  },

  createProduct: async (product) => {
    const response = await api.post("/api/v1/products", product);
    return response.data;
  },

  updateProduct: async (id, product) => {
    const response = await api.put(`/api/v1/products/${id}`, product);
    return response.data;
  },
};

// Order service
export const orderService = {
  getAll: async () => {
    const response = await api.get("api/v1/users/orders");
    return response.data.orders;
  },

  updateOrder: async (id, order) => {
    const response = await api.put(`/api/v1/users/orders/${id}`, order);
    return response.data.order;
  },
};
