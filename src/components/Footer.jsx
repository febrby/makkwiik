import React from "react";
import "./Footer.css";
import logo from "/src/assets/logo.png";       // Logo Cokotable
import halalIcon from "/src/assets/halal.png"; // Logo Halal

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-logo" style={{ display: "flex", alignItems: "center" }}>
          {/* Logo utama di kiri */}
          <img src={logo} alt="Cokotable Logo" style={{ width: "30px", height: "30px", marginRight: "8px" }} />
          <span style={{ display: "flex", alignItems: "center" }}>
            Cokotable Cookies
          </span>
        </div>

        <div className="footer-links">
          <a href="https://www.instagram.com/cokotable.co?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://api.whatsapp.com/send/?phone=6289616338255&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href="https://maps.app.goo.gl/LcxGuMYUqouqTNtf9" target="_blank" rel="noopener noreferrer">
            Lokasi
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Cokotable Cookies <img src={halalIcon} alt="Halal" style={{ width: "25px", height: "25px", marginLeft: "5px" }} /></p>
      </div>
    </footer>
  );
};

export default Footer;
