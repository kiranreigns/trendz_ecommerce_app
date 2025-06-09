import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { LuHeart, LuUser, LuSearch, LuX, LuLogOut } from "react-icons/lu";
import { MdArrowForwardIos } from "react-icons/md";
import { CgMenuLeftAlt } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi";
import ShopContext from "../../context/ShopContext";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logo.png";
import UserProfile from "../UserProfile/UserProfile";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

const Header = ({ onLoginClick }) => {
  const { bag } = useContext(ShopContext);
  const { isAuthenticated, user, logout } = useAuth();
  const [menu, setMenu] = useState("shop");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const mobileMenuRef = useRef(null);
  const userProfileRef = useRef(null);

  // Add click outside handler for user profile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userProfileRef.current &&
        !userProfileRef.current.contains(event.target)
      ) {
        setShowUserProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowMobileSearch(false);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    setIsMobileMenuOpen(false);
  };

  const closeMobileSearch = () => {
    setShowMobileSearch(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu when clicking outside
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-toggle")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Add body class to prevent scrolling when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("menu-open");
    };
  }, [isMobileMenuOpen]);

  const bagItemsCount = bag.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-content">
        {/* Mobile menu toggle */}
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? "" : <CgMenuLeftAlt size={29} />}
        </div>

        {/* Logo */}
        <div className="header-logo">
          <Link to="/" onClick={() => handleMenuClick("shop")}>
            <img src={logo} alt="TrendZ Logo" className="logo" />
          </Link>
          <span className="logo-text">TrendZ</span>
        </div>

        {/* Desktop Navigation Categories */}
        <nav className={`header-nav desktop-nav`}>
          <ul className="nav-menu">
            <li onClick={() => handleMenuClick("shop")}>
              <Link to="/">SHOP</Link>
              {menu === "shop" && <hr />}
            </li>
            <li onClick={() => handleMenuClick("men")}>
              <Link to="/men">MEN</Link>
              {menu === "men" && <hr />}
            </li>
            <li onClick={() => handleMenuClick("women")}>
              <Link to="/women">WOMEN</Link>
              {menu === "women" && <hr />}
            </li>
            <li onClick={() => handleMenuClick("kids")}>
              <Link to="/kids">KIDS</Link>
              {menu === "kids" && <hr />}
            </li>
          </ul>
        </nav>

        {/* Mobile Actions - Search, Wishlist, Bag */}
        <div className="mobile-actions">
          <div className="mobile-search-toggle" onClick={toggleMobileSearch}>
            <LuSearch size={25} />
          </div>

          <Link
            to="/wishlist"
            className="mobile-action-item"
            onClick={() => setMenu("")}
          >
            <LuHeart size={25} />
          </Link>

          <Link
            to="/bag"
            className="mobile-action-item"
            onClick={() => setMenu("")}
          >
            <div className="mobile-bag-icon-wrapper">
              <HiOutlineShoppingBag size={25} />
              {bagItemsCount > 0 && (
                <span className="mobile-bag-count">{bagItemsCount}</span>
              )}
            </div>
          </Link>
        </div>

        {/* Right section: Search & User Actions (Desktop) */}
        <div className="header-actions">
          {/* Desktop Search Bar */}
          <SearchBar isMobile={false} />

          {/* User Actions */}
          <div className="user-actions">
            <div
              className="action-item"
              onClick={() => {
                setMenu(""); // Remove hr from all nav items
                isAuthenticated
                  ? setShowUserProfile(!showUserProfile)
                  : onLoginClick();
              }}
            >
              <LuUser size={22} />
              <span className="action-label">Profile</span>
            </div>

            {showUserProfile && isAuthenticated && (
              <div className="user-profile-wrapper" ref={userProfileRef}>
                <UserProfile onClose={() => setShowUserProfile(false)} />
              </div>
            )}

            <Link
              to="/wishlist"
              className="action-item"
              onClick={() => setMenu("")} // Remove hr
            >
              <LuHeart size={22} />
              <span className="action-label">Wishlist</span>
            </Link>

            <Link
              to="/bag"
              className="action-item"
              onClick={() => setMenu("")} // Remove hr
            >
              <div className="bag-icon-wrapper">
                <HiOutlineShoppingBag size={22} />
                {bagItemsCount > 0 && (
                  <span className="bag-count">{bagItemsCount}</span>
                )}
              </div>
              <span className="action-label">Bag</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`mobile-menu-container ${isMobileMenuOpen ? "active" : ""}`}
        ref={mobileMenuRef}
      >
        <div className="mobile-menu-wrapper">
          {/* Mobile Menu Header with Close Button */}
          <div className="mobile-menu-header">
            <div className="mobile-menu-user-info">
              <div className="mobile-menu-avatar">
                <LuUser size={24} />
              </div>
              <div className="mobile-menu-welcome">
                <h3>{isAuthenticated ? user?.name : "Guest"}</h3>
                {!isAuthenticated && (
                  <div
                    className="sign-in-link"
                    onClick={() => {
                      onLoginClick();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign in / Register
                  </div>
                )}
              </div>
            </div>
            <div className="mobile-menu-close" onClick={toggleMobileMenu}>
              <LuX size={28} />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mobile-menu-nav">
            <ul>
              <li className={menu === "shop" ? "active" : ""}>
                <Link to="/" onClick={() => handleMenuClick("shop")}>
                  Shop
                  <span className="nav-arrow">
                    <MdArrowForwardIos size={18} />
                  </span>
                </Link>
              </li>
              <li className={menu === "men" ? "active" : ""}>
                <Link to="/men" onClick={() => handleMenuClick("men")}>
                  Men
                  <span className="nav-arrow">
                    <MdArrowForwardIos size={18} />
                  </span>
                </Link>
              </li>
              <li className={menu === "women" ? "active" : ""}>
                <Link to="/women" onClick={() => handleMenuClick("women")}>
                  Women
                  <span className="nav-arrow">
                    <MdArrowForwardIos size={18} />
                  </span>
                </Link>
              </li>
              <li className={menu === "kids" ? "active" : ""}>
                <Link to="/kids" onClick={() => handleMenuClick("kids")}>
                  Kids
                  <span className="nav-arrow">
                    <MdArrowForwardIos size={18} />
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Account Section */}
          <div className="mobile-menu-account">
            <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}>
              Account
            </Link>
            <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>
              Orders
            </Link>
            <Link to="/studio" onClick={() => setIsMobileMenuOpen(false)}>
              TrendZ Studio
            </Link>
            <Link to="/gift-cards" onClick={() => setIsMobileMenuOpen(false)}>
              Gift Cards
            </Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </Link>
          </div>

          {/* Logout Section */}
          {isAuthenticated && (
            <div className="mobile-menu-logout">
              <div className="logout-item" onClick={handleLogout}>
                <LuLogOut size={20} />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      <SearchBar
        isMobile={true}
        isVisible={showMobileSearch}
        onClose={closeMobileSearch}
        placeholder="Search for products"
      />
    </header>
  );
};

export default Header;
