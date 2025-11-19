import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/login");
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-animation">
          <div className="cookies-icon">🍪</div>
          <h2 className="hero-title">
            Cookies Terlezat<br />
            <span className="hero-highlight">di Kota Anda!</span>
          </h2>
          <p className="hero-description">
            Nikmati kelezatan cookies buatan rumah dengan resep rahasia keluarga yang telah diwariskan turun temurun. Setiap gigitan adalah kebahagiaan!
          </p>
          <div className="hero-buttons">
            <button className="primary" onClick={handleOrderClick}>
              🛒 Pesan Sekarang
            </button>
            <a href="#products" className="btn-outline">
              📖 Lihat Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
