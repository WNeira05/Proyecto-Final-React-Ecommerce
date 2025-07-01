import React from "react";
import "./styleEstatico.css";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h4>Ortopedia BN</h4>
          <p>&copy; 2025 - Todos los derechos reservados</p>
          <p className="footer-address">
            <FaMapMarkerAlt className="footer-icon" /> Av. Mitre 1234,
            Avellaneda, Buenos Aires
          </p>
        </div>

        <div className="footer-center">
          <p>Avellaneda, Buenos Aires, Argentina</p>
          <p>Lunes a sábado de 9 a 18hs</p>
        </div>

        <div className="footer-right">
          <p>Seguinos:</p>
          <div className="social-icons">
            <a
              href="https://wa.me/5491112345678"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
