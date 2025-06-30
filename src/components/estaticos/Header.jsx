import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './styleEstatico.css';
import Cart from '../Cart';
import { useAuth } from '../../context/AuthContext';
import { FaUserShield, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Header = ({ cartItems, borrarProducto }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const getLinkClass = ({ isActive }) => (isActive ? 'link active' : 'link');

  return (
    <header>
      <nav className="header-container">

        {/* Sección izquierda: logo + botón menú */}
        <div className="left-section">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="Ortopedia BN" className="logo-img" />
          </NavLink>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menú de navegación */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" className={getLinkClass} onClick={() => setMenuOpen(false)}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/acercade" className={getLinkClass} onClick={() => setMenuOpen(false)}>
              Sobre nosotros
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos" className={getLinkClass} onClick={() => setMenuOpen(false)}>
              Galeria de productos
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto" className={getLinkClass} onClick={() => setMenuOpen(false)}>
              Contacto
            </NavLink>
          </li>
        </ul>

        {/* Sección derecha: íconos admin, login, logout, carrito */}
        <div className="right-section">
          {isAuthenticated && (
            <NavLink to="/admin" className="btnIcon" onClick={() => setMenuOpen(false)}>
              <FaUserShield />
            </NavLink>
          )}

          {!isAuthenticated ? (
            <NavLink to="/login" className="btnIcon" onClick={() => setMenuOpen(false)}>
              <FaSignInAlt />
            </NavLink>
          ) : (
            <button className="btnLogout" onClick={handleLogout}>
              <FaSignOutAlt />
            </button>
          )}

          <button className="btnCart" onClick={() => setCartOpen(true)}>
            <i className="fa-solid fa-cart-shopping"></i>
          </button>

          <Cart
            borrarProducto={borrarProducto}
            cartItems={cartItems}
            isOpen={isCartOpen}
            onClose={() => setCartOpen(false)}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
