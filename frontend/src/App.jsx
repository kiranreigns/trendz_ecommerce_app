import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ShopCategory from "./pages/ShopCategory";
import { useAuth } from "./hooks/useAuth";
import AuthModal from "./pages/AuthModal";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Bag from "./pages/Bag";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/Footer/Footer";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import menBanner from "./assets/men-banner.png";
import womenBanner from "./assets/women-banner.jpg";
import kidsBanner from "./assets/kidsbanner.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StartFromTop from "./components/StartFromTop";

function App() {
  const { isAuthModalOpen, closeAuthModal, openAuthModal } = useAuth();

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
      <Header onLoginClick={openAuthModal} />
      <StartFromTop>
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
      </StartFromTop>

      {isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}

      <Footer />
    </>
  );
}

export default App;
