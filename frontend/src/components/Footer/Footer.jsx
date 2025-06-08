import React from "react";
import "./Footer.css";
import footerIcon from "../../assets/footer_icon.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo-section">
          <div className="footer-logo">
            <img
              src={footerIcon}
              alt="footer-logo"
              className="footer-logo-img"
            />
            <h2>TrendZ</h2>
          </div>
          <p className="footer-tagline">
            Elevate Your Style, Define Your Trend
          </p>
        </div>

        <div className="footer-links-container">
          <div className="footer-links">
            <h3>Shop</h3>
            <ul>
              <li>
                <a href="/collections/new-arrivals">New Arrivals</a>
              </li>
              <li>
                <a href="/collections/bestsellers">Bestsellers</a>
              </li>
              <li>
                <a href="/collections/women">Women</a>
              </li>
              <li>
                <a href="/collections/men">Men</a>
              </li>
              <li>
                <a href="/collections/accessories">Accessories</a>
              </li>
              <li>
                <a href="/collections/sale">Sale</a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Support</h3>
            <ul>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/faq">FAQs</a>
              </li>
              <li>
                <a href="/shipping">Shipping & Returns</a>
              </li>
              <li>
                <a href="/size-guide">Size Guide</a>
              </li>
              <li>
                <a href="/track-order">Track Order</a>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Company</h3>
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/sustainability">Sustainability</a>
              </li>
              <li>
                <a href="/careers">Careers</a>
              </li>
              <li>
                <a href="/press">Press</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-social">
          <a href="https://instagram.com/trendz" aria-label="Instagram">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="https://facebook.com/trendz" aria-label="Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="https://twitter.com/trendz" aria-label="Twitter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} TrendZ. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
