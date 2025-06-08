import React, { useState, useEffect } from "react";
import "./Offers.css";
import exclusive_image from "../../assets/exclusive-image.png";

const Offers = () => {
  // Initial time: 24 hours in seconds
  const initialTime = 24 * 60 * 60;

  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Format time into hours, minutes, seconds
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: String(hrs).padStart(2, "0"),
      minutes: String(mins).padStart(2, "0"),
      seconds: String(secs).padStart(2, "0"),
    };
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft]);

  const { hours, minutes, seconds } = formatTime(timeLeft);

  const scrollToBestSellers = () => {
    const section = document.getElementById("best-sellers");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="offers">
      <div className="offers-container">
        <div className="offers-left">
          <div className="offers-badge">Limited Time</div>
          <h1 className="offers-title">
            <span className="highlight">Exclusive</span> Offers For You
          </h1>
          <p className="offers-description">ONLY ON BEST SELLERS PRODUCTS</p>
          <button className="offers-button" onClick={scrollToBestSellers}>
            Check Now
            <span className="button-arrow">→</span>
          </button>

          {/* Countdown Timer */}
          <div className="offers-timer">
            <div className="timer-item">
              <span className="timer-number">{hours}</span>
              <span className="timer-label">Hours</span>
            </div>
            <div className="timer-item">
              <span className="timer-number">{minutes}</span>
              <span className="timer-label">Minutes</span>
            </div>
            <div className="timer-item">
              <span className="timer-number">{seconds}</span>
              <span className="timer-label">Seconds</span>
            </div>
          </div>
        </div>

        <div className="offers-right">
          <div className="image-wrapper">
            <div className="discount-badge">
              <span className="discount-amount">30%</span>
              <span className="discount-text">OFF</span>
            </div>
            <img src={exclusive_image} alt="Exclusive Offer" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;
