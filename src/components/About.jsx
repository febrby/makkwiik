import React from "react";
import "./About.css";
import halalIcon from "/src/assets/halal.png"; // Path untuk Vite

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-grid">
          <div className="about-text">
            <h3 className="about-title">Cerita Kami</h3>
            <p className="about-paragraph">
              Cokotable Cookies dimulai dari dapur kecil dengan semangat Islami untuk menghadirkan cookies yang lezat, <b>Halal</b>, dan aman untuk semua. Kami selalu menggunakan bahan-bahan <b>Halal</b> premium dan diproses dengan penuh cinta serta niat baik.
            </p>
            <p className="about-paragraph">
              Setiap cookies dipanggang fresh setiap hari untuk menjaga kualitas, kelezatan, dan kehalalan. Kami bangga melayani pelanggan dengan penuh keberkahan, menyebarkan rasa manis yang <b>Halal</b> di setiap kota.
            </p>
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Pelanggan Puas</div>
              </div>
              <div className="stat">
                <div className="stat-number">10+</div>
                <div className="stat-label">Varian Rasa Halal</div>
              </div>
              <div className="stat">
                <div className="stat-number">5★</div>
                <div className="stat-label">Rating</div>
              </div>
            </div>
          </div>

          <div className="about-card-container">
            <div className="about-card">
              {/* Emoji diganti gambar halal */}
              <div className="about-emoji">
                <img src={halalIcon} alt="Halal" style={{ width: "100px", height: "100px" }} />
              </div>
              <h4 className="about-card-title">Dibuat dengan Cinta & Halal</h4>
              <p className="about-card-desc">
                Setiap cookies dibuat dengan tangan oleh bakery berpengalaman, menggunakan bahan-bahan <b>Halal</b> dan mengikuti prinsip Islami dalam setiap prosesnya. 🌙
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
