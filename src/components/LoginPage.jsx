import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const toggleTab = (tab) => setIsRegister(tab === "register");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/customer/register",
          {
            name: fullName,
            email,
            password,
            password_confirmation: passwordConfirm,
          },
          { headers: { "Content-Type": "application/json", Accept: "application/json" } }
        );

        alert(response.data.message || "Register berhasil!");
        setIsRegister(false); // switch to login
        setFullName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
      } catch (error) {
        console.error("Register gagal:", error.response?.data || error.message);
        if (error.response?.data) {
          const messages = Object.values(error.response.data).flat().join("\n");
          alert(messages);
        } else alert("Register gagal!");
      }
      return;
    }

    // LOGIN
    try {
      const response = await axios.post(
        "http://localhost:8000/api/customer/login",
        { email, password },
        { headers: { "Content-Type": "application/json", Accept: "application/json" } }
      );

      localStorage.setItem("token", response.data.token);
      alert("Login berhasil!");
      navigate("/order");
    } catch (error) {
      console.error("Login gagal:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="bg-gradient cookie-pattern min-h-screen">
      <div id="loginPage" className="min-h-screen flex items-center justify-center p-4">
        <div className="authContainer fade-in">
          <div className="text-center mb-8">
            <div className="cookieEmoji">🍪</div>
            <h1 className="title">Cokotable Cookies</h1>
            <p className="subtitle">Kelezatan dalam Setiap Gigitan</p>
          </div>

          <div className="mb-6">
            <div className="tabContainer">
              <button
                id="loginTab"
                className={`tabButton ${!isRegister ? "active" : ""}`}
                onClick={() => toggleTab("login")}
              >
                Masuk
              </button>
              <button
                id="registerTab"
                className={`tabButton ${isRegister ? "active" : ""}`}
                onClick={() => toggleTab("register")}
              >
                Daftar
              </button>
            </div>
          </div>

          <form id="authForm" className="spaceY" onSubmit={handleSubmit}>
            {isRegister && (
              <div id="registerFields" className="spaceY">
                <input
                  type="text"
                  id="fullName"
                  placeholder="Nama Lengkap"
                  className="inputField"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <input
                  type="password"
                  id="passwordConfirm"
                  placeholder="Konfirmasi Password"
                  className="inputField"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>
            )}

            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              className="inputField"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              className="inputField"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="submitButton">
              <span id="authButtonText">{isRegister ? "Daftar" : "Masuk"}</span>
            </button>
          </form>

          <div className="mt6 textCenter">
            <p className="textSmall">Gunakan email yang terdaftar untuk masuk</p>
          </div>
        </div>
      </div>
    </div>
  );
}
