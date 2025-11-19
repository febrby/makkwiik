import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Navbar.css";
import logo from "/src/assets/logo.png"; // Logo Cokotable

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);

  const changeBackgroundColor = () => {
    if (window.scrollY > 50) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackgroundColor);
    return () => {
      window.removeEventListener("scroll", changeBackgroundColor);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`py-3 shadow-sm ${
        changeColor ? "navbar-scroll" : "navbar-transparent"
      }`}
    >
      <Container>
        <Navbar.Brand
          as={HashLink}
          smooth
          to="/#home"
          className="fw-bold text-brown fs-3"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src={logo} alt="Cokotable Logo" style={{ width: "40px", height: "40px", marginRight: "5px" }} />
          Cokotable
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-center text-center">
          <Nav className="gap-4 my-3 my-lg-0">
            <Nav.Link as={HashLink} smooth to="/#home" className="fw-semibold text-brown nav-link-hover">
              Beranda
            </Nav.Link>
            <Nav.Link as={HashLink} smooth to="/#products" className="fw-semibold text-brown nav-link-hover">
              Produk
            </Nav.Link>
            <Nav.Link as={HashLink} smooth to="/#about" className="fw-semibold text-brown nav-link-hover">
              Tentang
            </Nav.Link>
            <Nav.Link as={HashLink} smooth to="/#contact" className="fw-semibold text-brown nav-link-hover">
              Kontak
            </Nav.Link>
          </Nav>
          <div className="ms-lg-5 text-lg-end text-center mt-0 mt-lg-0">
            <Link
              to="/login"
              className="btn1"
              style={{ textDecoration: "none", display: "inline-block", textAlign: "center" }}
            >
              Pesan Sekarang
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
