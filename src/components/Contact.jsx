import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Silakan pilih rating terlebih dahulu!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/public/ratings",
        {
          name,
          email,
          review: message,
          rating,
        }
      );

      if (response.data.success) {
        alert("Review berhasil dikirim!");
        setName("");
        setEmail("");
        setMessage("");
        setRating(0);
      } else {
        alert(response.data.message || "Gagal mengirim review");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Terjadi kesalahan jaringan.");
      }
    }

    setLoading(false);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            cursor: "pointer",
            color: i <= rating ? "#FFD700" : "#ccc",
            fontSize: "1.8rem",
            marginRight: "5px",
          }}
          onClick={() => setRating(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h3 className="contact-title">Hubungi Kami</h3>
        <div className="contact-grid">
          {/* Info Kontak */}
          <div className="contact-info">
            <h4 className="contact-info-title">Informasi Kontak</h4>
            <div className="contact-info-list">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <div className="contact-label">Alamat</div>
                  <div className="contact-value">
                    Gintungan, RT.20/RW.11, Butuh, Tengaran, Semarang Regency, Central Java 50775
                  </div>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <div className="contact-label">Telepon</div>
                  <div className="contact-value">+62 8961-6338-255</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">⏰</span>
                <div>
                  <div className="contact-label">Jam Buka</div>
                  <div className="contact-value">Senin - Minggu: 07.00 - 17.00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Contact */}
          <div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div>
                <label className="contact-label-text">Nama</label>
                <input
                  type="text"
                  className="contact-input"
                  placeholder="Masukkan nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="contact-label-text">Email</label>
                <input
                  type="email"
                  className="contact-input"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="contact-label-text">Pesan / Review</label>
                <textarea
                  rows="4"
                  className="contact-input"
                  placeholder="Tulis pesan Anda..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="contact-label-text">Rating</label>
                <div>{renderStars()}</div>
              </div>

              <button type="submit" className="contact-button" disabled={loading}>
                {loading ? "Mengirim..." : "Kirim 📨"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
