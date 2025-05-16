import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./Components/Header/Header";
import ShopCategory from "./Pages/ShopCategory";
import AuthModal from "./Pages/AuthModal";
import Shop from "./Pages/Shop";
import Product from "./Pages/Product";
import Bag from "./Pages/Bag";
import Wishlist from "./Pages/Wishlist";
import Footer from "./Components/Footer/Footer";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import menBanner from "./assets/men-banner.jpg";
import womenBanner from "./assets/women-banner.jpg";
import kidsBanner from "./assets/kidsbanner.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header onLoginClick={handleOpenModal} />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route
          path="/men"
          element={<ShopCategory banner={menBanner} category="men" />}
        />
        <Route
          path="/women"
          element={<ShopCategory banner={womenBanner} category="women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kidsBanner} category="kids" />}
        />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="orders" element={<Orders />} />
      </Routes>

      {isModalOpen && <AuthModal onClose={handleCloseModal} />}

      <Footer />
    </>
  );
}

export default App;
