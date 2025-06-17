import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategoryCards.css';

const CategoryCards = () => {
  return (
    <section className="category-container">
      <div className="category-card men">
        <div className="card-content">
          <h2>Men's Collection</h2>
          <p>Discover the latest in men's luxury fashion</p>
        </div>
        <div className="category-options">
          <Link to="/men" className="option">Shop All</Link>
          <Link to="/men/clothing" className="option">Clothing</Link>
          <Link to="/men/shoes" className="option">Shoes</Link>
          <Link to="/men/bags" className="option">Bags</Link>
          <Link to="/men/accessories" className="option">Accessories</Link>
        </div>
      </div>
      <div className="category-card women">
        <div className="card-content">
          <h2>Women's Collection</h2>
          <p>Explore exclusive women's luxury pieces</p>
        </div>
        <div className="category-options">
          <Link to="/women" className="option">Shop All</Link>
          <Link to="/women/clothing" className="option">Clothing</Link>
          <Link to="/women/shoes" className="option">Shoes</Link>
          <Link to="/women/bags" className="option">Bags</Link>
          <Link to="/women/accessories" className="option">Accessories</Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryCards; 