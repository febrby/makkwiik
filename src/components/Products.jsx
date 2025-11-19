import React, { useState, useEffect } from "react";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [animatedImage, setAnimatedImage] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/public/sliders")
      .then((res) => res.json())
      .then((data) => {
        console.log("Slider API Response:", data);

        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => console.error("Error fetch sliders:", err));
  }, []);

  const handleImageClick = (id) => {
    setAnimatedImage(id);
    setTimeout(() => setAnimatedImage(null), 600);
  };

  return (
    <section id="products" className="products-section">
      <div className="products-container">
        <h3 className="products-title">Koleksi Cookies Kami</h3>

        {products.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", marginTop: "20px" }}>
            Tidak ada data slider ditemukan.
          </p>
        ) : (
          <div className="products-scroll">
            <div className="products-grid"> 
              {products.map((item) => (
                <div className="product-card" key={item.id}>
                  <div
                    className={`product-image-wrapper ${
                      animatedImage === item.id ? "animate-zoom-bounce" : ""
                    }`}
                    onClick={() => handleImageClick(item.id)}
                  >
                    <img
                      src={item.image_url}
                      alt={item.title || "Slider Image"}
                      className="product-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "http://127.0.0.1:8000/images/no-image.png";
                      }}
                    />
                  </div>

                  <h4 className="product-name">{item.title}</h4>

                  <p className="product-desc">
                    {item.description || "Tidak ada deskripsi"}
                  </p>

                  <div className="product-price">
                    <span className="price-amount">
                      Rp{" "}
                      {item.price
                        ? Number(item.price).toLocaleString("id-ID")
                        : "0"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
