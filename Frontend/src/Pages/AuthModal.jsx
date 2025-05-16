import { useState, useEffect, useRef } from "react";
import "./CSS/AuthModal.css";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/useAuth";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login, signup } = useAuth();

  const modalRef = useRef();

  // Escape key closes modal
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  // Outside click closes modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (isLogin) {
        response = await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      if (response.success) {
        onClose();
        toast.success(isLogin ? "Login successful!" : "Account created!");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.message === "Account already exists. Please login instead.") {
        toast.warning(error.message, {
          onClick: () => setIsLogin(true), // Allow user to click on toast to switch to login
        });
      } else if (error.message === "User does not exist") {
        toast.error("User doesn't exist");
      } else if (error.message === "Invalid password") {
        toast.error("Invalid password");
      } else {
        toast.error(error.message || "An error occurred. Please try again.");
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      name: "",
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {isLogin ? "Log in to your account" : "Sign up to start shopping"}
          </p>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {isLogin && (
              <div className="forgot-password">
                <a href="#">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="submit-button">
              {isLogin ? "Log In" : "Create Account"}
            </button>
          </form>

          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-buttons">
              <button className="social-button google">
                <FaGoogle className="social-icon" /> Google
              </button>
              <button className="social-button facebook">
                <FaFacebookF className="social-icon" /> Facebook
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleMode} className="toggle-button">
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;