import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import MainApp from "./components/MainApp";
import Payment from "./components/Payment";

function AppLayout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/order" || location.pathname === "/payment";
  const hideFooter =
    location.pathname === "/order" || location.pathname === "/payment";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Products />
              <About />
              <Contact />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order" element={<MainApp />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
