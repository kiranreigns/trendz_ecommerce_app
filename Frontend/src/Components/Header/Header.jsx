import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { LuHeart, LuUser, LuSearch, LuMenu, LuX } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi";
import ShopContext from "../../Context/ShopContext";
import { useAuth } from "../../Context/useAuth";
import logo from "../../assets/logo.png";
import UserProfile from "../UserProfile/UserProfile";
import "./Header.css";

// Mock data for search suggestions
const searchSuggestions = [
  "Summer dresses",
  "Men's sneakers",
  "Kids winter jackets",
  "Women's accessories",
  "Sport shoes",
  "Formal wear",
  "Casual t-shirts",
  "Denim jeans",
];

const Header = ({ onLoginClick }) => {
  const { bag } = useContext(ShopContext);
  const { isAuthenticated, user } = useAuth();
  const [menu, setMenu] = useState("shop");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const searchRef = useRef(null);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchSuggestions(e.target.value.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setShowSearchSuggestions(false);
    setShowMobileSearch(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
    console.log("Selected suggestion:", suggestion);
  };

  // Filter suggestions based on search query
  const filteredSuggestions = searchSuggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
      }

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
          {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
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

        {/* Mobile Search Toggle */}
        <div className="mobile-search-toggle" onClick={toggleMobileSearch}>
          <LuSearch size={22} />
        </div>

        {/* Right section: Search & User Actions */}
        <div className="header-actions">
          {/* Desktop Search Bar with Suggestions */}
          <div className={`search-container desktop-search`} ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-wrapper">
                <button type="submit" className="search-icon">
                  <LuSearch size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Search for products"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>

              {/* Search Suggestions */}
              {showSearchSuggestions && filteredSuggestions.length > 0 && (
                <div className="search-suggestions">
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <LuSearch size={14} className="suggestion-icon" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* User Actions */}
          <div className="user-actions">
            <div
              className="action-item"
              onClick={() =>
                isAuthenticated
                  ? setShowUserProfile(!showUserProfile)
                  : onLoginClick()
              }
            >
              <LuUser size={22} />
              <span className="action-label">Profile</span>
            </div>

            {showUserProfile && isAuthenticated && (
              <div className="user-profile-wrapper" ref={userProfileRef}>
                <UserProfile onClose={() => setShowUserProfile(false)} />
              </div>
            )}

            <Link to="/wishlist" className="action-item">
              <LuHeart size={22} />
              <span className="action-label">Wishlist</span>
            </Link>

            <Link to="/bag" className="action-item">
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
          {/* User Profile Section */}
          <div className="mobile-menu-user">
            <div className="mobile-menu-avatar">
              <LuUser size={24} />
            </div>
            <div className="mobile-menu-welcome">
              <h3>{isAuthenticated ? user?.name || "Welcome" : "Welcome"}</h3>
              {!isAuthenticated && (
                <div
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

          {/* Navigation Links */}
          <nav className="mobile-menu-nav">
            <ul>
              <li className={menu === "shop" ? "active" : ""}>
                <Link to="/" onClick={() => handleMenuClick("shop")}>
                  SHOP
                </Link>
              </li>
              <li className={menu === "men" ? "active" : ""}>
                <Link to="/men" onClick={() => handleMenuClick("men")}>
                  MEN
                </Link>
              </li>
              <li className={menu === "women" ? "active" : ""}>
                <Link to="/women" onClick={() => handleMenuClick("women")}>
                  WOMEN
                </Link>
              </li>
              <li className={menu === "kids" ? "active" : ""}>
                <Link to="/kids" onClick={() => handleMenuClick("kids")}>
                  KIDS
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  NEW ARRIVALS
                </Link>
              </li>
              <li>
                <Link to="/sale" onClick={() => setIsMobileMenuOpen(false)}>
                  SALE
                </Link>
              </li>
            </ul>
          </nav>

          {/* Quick Actions */}
          <div className="mobile-menu-actions">
            <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
              <LuHeart size={20} />
              <span>Wishlist</span>
            </Link>
            <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>
              <HiOutlineShoppingBag size={20} />
              <span>My Orders</span>
            </Link>
          </div>

          {/* Footer Links */}
          <div className="mobile-menu-footer">
            <Link to="/help" onClick={() => setIsMobileMenuOpen(false)}>
              Help & Support
            </Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (conditionally rendered) */}
      {showMobileSearch && (
        <div className="mobile-search-container" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="mobile-search-form">
            <div className="mobile-search-wrapper">
              <button type="submit" className="search-icon">
                <LuSearch size={20} />
              </button>
              <input
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
                autoFocus
              />
              <button
                type="button"
                className="mobile-search-close"
                onClick={toggleMobileSearch}
              >
                <LuX size={20} />
              </button>
            </div>

            {/* Search Suggestions */}
            {showSearchSuggestions && filteredSuggestions.length > 0 && (
              <div className="search-suggestions">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <LuSearch size={14} className="suggestion-icon" />
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
