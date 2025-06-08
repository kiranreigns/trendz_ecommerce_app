import React from "react";
import "./Hero.css";
import hero_image from "../../assets/hero_image.png";
import arrow_icon from "../../assets/arrow.png";

const scrollToNewCollections = () => {
  const section = document.getElementById("new-collections");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-left">
          <h2>Elevate Your Style with</h2>
          <div className="hero-headline">
            <div className="hand-icon-wrapper">
              <h1 className="brand-text">Brand</h1>
            </div>
            <h1 className="new-text">New ✨</h1>
            <h1 className="collections-text">Collections</h1>
          </div>

          <button className="hero-latest-btn" onClick={scrollToNewCollections}>
            <span>Latest Collections</span>
            <img src={arrow_icon} alt="arrow-icon" />
          </button>
        </div>

        <div className="hero-right">
          <div className="hero-image-container">
            <img src={hero_image} alt="Latest fashion collection" />
            <div className="hero-image-circle"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
