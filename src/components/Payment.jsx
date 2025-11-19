import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    { name: "COD", icon: "/icons/cod.png" },
    { name: "DANA", icon: "/icons/dana.png" },
    { name: "QRIS", icon: "/icons/qris.png" },
    { name: "Kartu Kredit/Debit", icon: "/icons/card.png" },
  ];

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleBack = () => setSelectedMethod(null);
  const handleConfirm = () => {
    alert("Pembayaran berhasil!");
    navigate("/");
  };

  return (
    <div className="payment-container">
      {!selectedMethod ? (
        <div className="payment-box">
          <h2>Pilih Metode Pembayaran</h2>
          <div className="payment-grid">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className={`payment-card ${
                  selectedMethod === method.name ? "active" : ""
                }`}
                onClick={() => handleSelect(method.name)}
              >
                <div className="icon-wrapper">
                  <img src={method.icon} alt={method.name} className="payment-icon" />
                </div>
                <span className="payment-name">{method.name}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/order")} className="btn-secondary">
            Kembali
          </button>
        </div>
      ) : (
        <div className="payment-detail-box">
          <h2>
            {selectedMethod === "Kartu Kredit/Debit"
              ? "Pembayaran Kartu Debit/Kredit"
              : selectedMethod === "COD"
              ? "Pembayaran COD (Cash on Delivery)"
              : `Pembayaran ${selectedMethod}`}
          </h2>

          {(selectedMethod === "DANA" || selectedMethod === "QRIS") && (
            <div className="barcode-box">
              <img
                src={selectedMethod === "DANA" ? "/barcodes/dana.jpeg" : "/barcodes/qris.jpeg"}
                alt={`${selectedMethod} Barcode`}
                className="barcode-image"
              />
              <p>Scan barcode di atas untuk menyelesaikan pembayaran.</p>
            </div>
          )}

          {selectedMethod === "Kartu Kredit/Debit" && (
            <form className="debit-form" onSubmit={(e) => e.preventDefault()}>
              <label>Nomor Kartu</label>
              <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} />

              <label>Nama di Kartu</label>
              <input type="text" placeholder="Nama Lengkap" />

              <div className="form-row">
                <div>
                  <label>MM/YY</label>
                  <input type="text" placeholder="12/26" maxLength={5} />
                </div>
                <div>
                  <label>CVV</label>
                  <input type="password" placeholder="123" maxLength={3} />
                </div>
              </div>
            </form>
          )}

          {selectedMethod === "COD" && (
            <form className="cod-form" onSubmit={(e) => e.preventDefault()}>
              <label>Nama Penerima</label>
              <input type="text" placeholder="Nama lengkap penerima" />

              <label>Alamat Pengiriman</label>
              <textarea placeholder="Tulis alamat lengkap pengiriman" rows={3}></textarea>

              <label>Catatan (opsional)</label>
              <input type="text" placeholder="Misal: Rumah warna hijau" />
            </form>
          )}

          <div className="payment-buttons">
            <button onClick={handleBack} className="btn-secondary">
              Kembali
            </button>
            <button onClick={handleConfirm} className="btn-primary">
              Konfirmasi Pembayaran
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
