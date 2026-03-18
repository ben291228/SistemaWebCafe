import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Coffee, ShoppingBag, LogOut, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Coffee size={32} />
          <span>Sistema Web Café</span>
        </Link>

        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Catálogo</Link>
          <Link to="/orders" onClick={() => setIsMenuOpen(false)}>Mis Pedidos</Link>
        </div>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-action">
            <ShoppingBag size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <div className="user-profile">
            <span className="username">{user?.username}</span>
            <button onClick={logout} className="logout-btn" title="Cerrar sesión">
              <LogOut size={20} />
            </button>
          </div>

          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <style>{`
        .navbar {
          background: transparent;
          backdrop-filter: blur(1px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 15px 0;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #d4a373;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1.5rem;
        }

        .navbar-logo span {
          color: white;
        }

        .navbar-links {
          display: flex;
          gap: 30px;
        }

        .navbar-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .navbar-links a:hover {
          color: #d4a373;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .cart-action {
          position: relative;
          color: white;
          transition: color 0.3s ease;
        }

        .cart-action:hover {
          color: #d4a373;
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #d4a373;
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 15px;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          padding-left: 20px;
        }

        .username {
          color: rgba(255, 255, 255, 0.9);
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
        }

        .logout-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          margin-left: 0;
          padding: 0;
        }

        .logout-btn:hover {
          color: #f87171;
        }

        .menu-toggle {
          display: none;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          margin-left: 0;
        }

        @media (max-width: 768px) {
          .navbar-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(20, 20, 20, 0.95);
            flex-direction: column;
            padding: 20px;
            gap: 15px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .navbar-links.open {
            display: flex;
          }

          .menu-toggle {
            display: block;
          }

          .user-profile {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
