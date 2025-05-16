import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NewProduct from "./pages/NewProduct";
import ProductsList from "./pages/ProductsList";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import { adminService } from "./services/api.js";

const App = () => {
  const [token, setToken] = useState(
    adminService.isAuthenticated() ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      adminService.logout();
    }
  }, [token]);

  const handleLogout = () => {
    adminService.logout();
    setToken("");
  };

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header setToken={handleLogout} />
      <div className="flex">
        <Sidebar />
        <div className="ml-[20%] mt-[4rem] w-full p-8 text-gray-600 text-base overflow-auto">
          <Routes>
            <Route path="/add-product" element={<NewProduct token={token} />} />
            <Route
              path="/products-list"
              element={<ProductsList token={token} />}
            />
            <Route path="/orders" element={<Orders token={token} />} />
            <Route path="*" element={<Navigate to="/add-product" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
