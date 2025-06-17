// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Make sure this path is correct
import logo from '../img/logo.png';
import googlePlay from '../img/google-play.png';
import appStore from '../img/app-store.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-logo-section">
            <Link to="/admin/login">
              <img src={logo} alt="LuxuryInTaste Logo" className="footer-logo" />
            </Link>
          </div>
          
          <div className="footer-middle">
            <nav className="footer-nav">
              <a href="/" className="footer-link">Home</a>
              <a href="/about" className="footer-link">About</a>
              <a href="/privacy" className="footer-link">Privacy Policy</a>
              <a href="/terms" className="footer-link">Terms of Services</a>
            </nav>
            <div className="footer-subscribe">
              <h3>Join our Community</h3>
              <div className="subscribe-form">
                <input 
                  type="email" 
                  placeholder="Enter Your Email" 
                  className="subscribe-input"
                />
                <button className="subscribe-button">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h3 className="contact-heading">Contact Us</h3>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fas fa-envelope"></i>
                <span>Email</span>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin"></i>
                <span>LinkedIn</span>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
                <span>Twitter</span>
              </a>
            </div>
          </div>

          <div className="app-downloads">
            <a href="#" className="store-badge">
              <img src={googlePlay} alt="Google Play icon" className="store-icon" />
              <div className="store-text">
                <span className="store-action">Get it on</span>
                <span className="store-name">Google Play</span>
              </div>
            </a>
            <a href="#" className="store-badge">
              <img src={appStore} alt="App Store icon" className="store-icon" />
              <div className="store-text">
                <span className="store-action">Get it on </span>
                <span className="store-name">App Store </span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 LuxuryInTaste. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;