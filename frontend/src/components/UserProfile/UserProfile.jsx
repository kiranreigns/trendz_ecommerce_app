import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  LuUser,
  LuHeart,
  LuShoppingBag,
  LuTicket,
  LuLogOut,
} from "react-icons/lu";
import "./UserProfile.css";

const UserProfile = ({ onClose }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="user-profile-modal">
      <div className="user-profile-header">
        <div className="user-info">
          <LuUser size={40} className="user-avatar" />
          <div className="user-details">
            <h3>{user?.name || "User"}</h3>
            <p>{user?.email || ""}</p>
          </div>
        </div>
      </div>

      <div className="user-profile-menu">
        <Link to="/orders" className="menu-item" onClick={onClose}>
          <LuShoppingBag />
          <span>My Orders</span>
        </Link>

        <Link to="/wishlist" className="menu-item" onClick={onClose}>
          <LuHeart />
          <span>Wishlist</span>
        </Link>

        <Link to="/coupons" className="menu-item" onClick={onClose}>
          <LuTicket />
          <span>My Coupons</span>
        </Link>

        <button className="menu-item logout" onClick={handleLogout}>
          <LuLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
