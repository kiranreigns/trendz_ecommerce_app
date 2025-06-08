import React, { useState } from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
      // In a real application, you would send this data to your backend
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className="news-letter">
      <h1>Get Exclusive Offers on your Email</h1>
      <p>
        Subscribe to our Newsletter and stay updated on latest products and
        exciting deals
      </p>
      <form onSubmit={handleSubmit} className="subscribe-form">
        <div
          className={`input-container ${isHovered ? "hovered" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <input
            type="email"
            placeholder="Your Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={isSubscribed ? "subscribed" : ""}>
            {isSubscribed ? "Subscribed!" : "Subscribe"}
          </button>
        </div>
        {isSubscribed && (
          <p className="success-message">Thank you for subscribing!</p>
        )}
      </form>
    </div>
  );
};

export default NewsLetter;
