import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MainApp.css";

export default function MainApp() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("menu");
  const [queueNumber, setQueueNumber] = useState("");
  const [notification, setNotification] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Ambil token dari login

  const axiosAuth = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  // --- Fetch Produk ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/public/products");
        if (res.data.success) setProducts(res.data.data);
        else setProducts([]);
      } catch (err) {
        console.error("Gagal fetch produk:", err.response?.data || err.message);
      }
    };
    fetchProducts();
  }, []);

  // --- Fetch Cart ---
  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axiosAuth.get("http://localhost:8000/api/customer/cart");
      if (res.data.success) {
        setCart(res.data.data.cart || res.data.data || []);
      }
    } catch (err) {
      console.error("Gagal fetch cart:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  // --- Tambah ke Keranjang ---
  const addToCart = async (product) => {
    try {
      const res = await axiosAuth.post("http://localhost:8000/api/customer/cart", {
        product_id: product.id,
        qty: 1,
      });
      setNotification(res.data.message);
      fetchCart();
      setTimeout(() => setNotification(""), 2000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Gagal tambah ke keranjang");
    }
  };

  // --- Update Quantity ---
  const updateQuantity = async (cartItem, change) => {
    try {
      if (change > 0) {
        await axiosAuth.post("http://localhost:8000/api/customer/cart/increment", {
          cart_id: cartItem.id,
          product_id: cartItem.product_id,
        });
      } else {
        await axiosAuth.post("http://localhost:8000/api/customer/cart/decrement", {
          cart_id: cartItem.id,
          product_id: cartItem.product_id,
        });
      }
      fetchCart();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Gagal update quantity");
    }
  };

  // --- Hapus Item ---
  const removeFromCart = async (cartItem) => {
    try {
      await axiosAuth.delete(`http://localhost:8000/api/customer/cart/${cartItem.id}`);
      fetchCart();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Gagal hapus item");
    }
  };

  // --- Checkout ---
  const checkout = async () => {
    if (cart.length === 0) {
      alert("Keranjang kosong!");
      return;
    }

    try {
      // Payload boleh kosong, backend otomatis pakai default
      const res = await axiosAuth.post("http://localhost:8000/api/customer/checkout", {});
      if (res.data.success) {
        setOrderDetails(res.data.data.order_items || []);
        setQueueNumber(res.data.data.queue_number || "123");
        setCart([]);
        setPage("confirmation");
        setNotification("Checkout berhasil!");
        setTimeout(() => setNotification(""), 2000);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Checkout gagal");
    }
  };

  const totalItems = (cart || []).reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = (cart || []).reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <div className="app-body">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <span className="cookie-icon">🍪 Cokotable Cookies</span>
        </div>
        <nav className="nav">
          <button className={`nav-btn ${page === "menu" ? "active" : ""}`} onClick={() => setPage("menu")}>Menu</button>
          <button className={`nav-btn ${page === "cart" ? "active" : ""}`} onClick={() => setPage("cart")}>
            Keranjang <span className="badge">{totalItems}</span>
          </button>
        </nav>
        <div className="header-actions">
          <button className="btn-exit" onClick={() => navigate("/")}>Keluar</button>
          <button className="btn-check-cart" onClick={() => setPage("cart")}>Lihat Keranjang</button>
        </div>
      </header>

      {/* Notifikasi */}
      {notification && <div className="notification-popup">{notification}</div>}

      {/* MENU PAGE */}
      {page === "menu" && (
        <div className="menu-page fade-in">
          <div className="section-title">
            <h2>Menu Cookies Kami</h2>
            <p>Pilih cookies favorit Anda!</p>
          </div>
          <div className="menu-grid">
            {products.map((item) => (
              <div key={item.id} className="menu-card">
                <img src={item.image_url} alt={item.title} className="cookie-image" />
                <h3>{item.title}</h3>
                <p>{item.description_plain}</p>
                {item.ratings_avg_rating && <p>Rating: {item.ratings_avg_rating} ⭐</p>}
                <div className="price-row">
                  <span className="price">Rp {item.price.toLocaleString()}</span>
                  <button className="add-btn" onClick={() => addToCart(item)}>Tambah ke Keranjang</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CART PAGE */}
      {page === "cart" && (
        <div className="cart-page fade-in">
          <h2>Keranjang Saya</h2>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="cart-icon">🛒</div>
              <h3>Keranjang Kosong</h3>
              <p>Belum ada cookies yang dipilih</p>
              <button className="btn-primary" onClick={() => setPage("menu")}>Mulai Belanja</button>
            </div>
          ) : (
            <>
              <div className="cart-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-left">
                      <img src={item.product.image_url} alt={item.product.title} className="cart-item-image" />
                      <div>
                        <h4>{item.product.title}</h4>
                        <p>Rp {item.product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="item-right">
                      <div className="qty-controls">
                        <button onClick={() => updateQuantity(item, -1)} className="qty-btn">-</button>
                        <span className="qty-number">{item.qty}</span>
                        <button onClick={() => updateQuantity(item, 1)} className="qty-btn">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item)} className="delete-btn">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Total:</span>
                  <span>Rp {totalPrice.toLocaleString()}</span>
                </div>
                <button onClick={checkout} className="checkout-btn">Checkout</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* CONFIRMATION PAGE */}
      {page === "confirmation" && (
        <div className="confirmation-page slide-up">
          <div className="confirm-card bounce-in">
            <div className="check-icon">✅</div>
            <h2>Pesanan Berhasil!</h2>
            <div className="order-details">
              <h3>Detail Pesanan</h3>
              {orderDetails.map((item) => (
                <div key={item.id} className="order-item">
                  <span>{item.product.title} x{item.qty}</span>
                  <span>Rp {(item.product.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="total">
                <span>Total</span>
                <span>Rp {orderDetails.reduce((sum, i) => sum + i.product.price * i.qty, 0).toLocaleString()}</span>
              </div>
            </div>

            <div className="queue-box">
              <h3>Nomor Antrian Anda</h3>
              <div className="queue-number">{queueNumber}</div>
              <p>Simpan nomor ini untuk mengambil pesanan</p>
            </div>

            <p className="estimate">
              Estimasi waktu: <strong>15–20 menit</strong>
            </p>
            <button onClick={() => navigate("/payment")} className="btn-primary">Pilih Metode Pembayaran</button>
          </div>
        </div>
      )}
    </div>
  );
}
