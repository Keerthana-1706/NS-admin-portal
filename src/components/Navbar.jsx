import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';
import logoImage from '../img/logo.png';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();
  const isStoreActive = location.pathname === '/game-modes' || location.pathname === '/store';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={logoImage} alt="Logo" className="logo-image" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <Link to="/game-modes" className="nav-link" onClick={toggleMenu}>Game modes</Link>
          <Link to="/store" className="nav-link active" onClick={toggleMenu}>Store</Link>
          <Link to="/profile" className="nav-link" onClick={toggleMenu}>Profile</Link>
          <Link to="/leaderboard" className="nav-link" onClick={toggleMenu}>Leaderboard</Link>
          <Link to="/settings" className="nav-link" onClick={toggleMenu}>Settings</Link>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="nav-links desktop-only">
        <Link to="/game-modes" className="nav-link">Game modes</Link>
        <Link to="/store" className="nav-link active">Store</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
        <Link to="/settings" className="nav-link">Settings</Link>
      </div>

      <div className="navbar-right">
        <Link to="/wishlist" className="icon-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </Link>
        <Link to="/cart" className="icon-link">
          <div style={{ position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartItems.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'red',
                color: 'white',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>
        <div className="user-profile">
          <img src="/src/img/default-avatar.png" alt="Profile" className="profile-image" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 