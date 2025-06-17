import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        <button 
          className={`wishlist-button ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isWishlisted ? "white" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div className="product-info">
        <div className="brand-name">{product.brand}</div>
        <h3 className="product-name-card">{product.name}</h3>
        <div className="price-container">
          <div className="current-price">Rs. {product.price.toLocaleString()}</div>
          {product.originalPrice && (
            <div className="original-price">Rs. {product.originalPrice.toLocaleString()}</div>
          )}
          {product.discount && (
            <div className="discount">{product.discount}% OFF</div>
          )}
        </div>
        <div className="button-container">
          <Link to={`/product/${product.id}`} className="buy-now">Buy Now</Link>
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 