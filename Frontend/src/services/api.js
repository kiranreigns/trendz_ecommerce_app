import axios from "axios";

// Create an instance of axios with default configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only clear token and dispatch auth-error for token-related 401 errors
    // Not for login/password validation errors
    if (
      error.response?.status === 401 &&
      !error.response?.data?.error?.includes("Invalid Password")
    ) {
      // Clear auth state on unauthorized
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("auth-error"));
    }
    return Promise.reject(error);
  }
);

// Auth service
export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/api/v1/auth/login", credentials);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      if (error.response?.data?.error === "User does not exist") {
        throw new Error("User does not exist");
      } else if (error.response?.data?.error === "Invalid Password!") {
        throw new Error("Invalid password");
      }
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      const response = await api.post("/api/v1/auth/signup", userData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      if (
        error.response?.status === 409 ||
        error.response?.data?.error ===
          "Account already exists. Please login instead."
      ) {
        throw new Error("Account already exists. Please login instead.");
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.clear();
    window.dispatchEvent(new Event("logout"));
  },

  isAuthenticated: () => {
    return Boolean(localStorage.getItem("token"));
  },

  getCurrentUser: async () => {
    const response = await api.get("/api/v1/auth/me");
    return response.data.user;
  },
};

// Product service
export const productService = {
  getAll: async () => {
    const response = await api.get("/api/v1/products");
    return response.data.products;
  },
};

// User service
export const userService = {
  getUserData: async () => {
    const response = await api.get("/api/v1/user/data");
    return response.data;
  },

  // Wishlist operations
  updateWishlist: async (productId, action) => {
    const response = await api.post("/api/v1/user/wishlist", {
      productId,
      action,
    });
    return response.data;
  },

  // Bag operations
  updateBag: async (productId, quantity, size, action) => {
    const response = await api.post("/api/v1/user/bag", {
      productId,
      quantity,
      size,
      action,
    });
    return response.data;
  },

  // Order operations
  createOrder: async (orderData) => {
    const response = await api.post("/api/v1/user/orders", orderData);
    return response.data;
  },
};

