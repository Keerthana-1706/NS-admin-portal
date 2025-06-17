import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import '../styles/Cart.css';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    updateSize,
    applyPromoCode,
    promoCode,
    discount,
    calculateSubtotal,
    calculateTotal
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleQuantityChange = (productId, value) => {
    if (value > 0) {
      updateQuantity(productId, value);
    }
  };

  const handleSizeChange = (productId, size) => {
    updateSize(productId, size);
  };

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      const success = applyPromoCode(promoInput.trim());
      if (success) {
        setPromoError('');
      } else {
        setPromoError('Invalid promo code');
      }
    }
  };

  const subtotal = calculateSubtotal();
  const total = calculateTotal();
  const shipping = 0; // Free shipping

  return (
    <div className="cart-page">
      <div className="cart-content">
        <h1>Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart-message">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-container">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <div className="cart-item-info">
                      {item.brand && <div className="cart-item-brand">{item.brand}</div>}
                      <h3 className="cart-item-name">{item.name}</h3>
                      <div className="cart-item-price">€{(item.price * (item.quantity || 1)).toFixed(2)}</div>
                    </div>
                    <div className="cart-item-controls">
                      <select
                        className="quantity-select"
                        value={item.quantity || 1}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                      {item.sizes && (
                        <select
                          className="size-select"
                          value={item.size || 'M'}
                          onChange={(e) => handleSizeChange(item.id, e.target.value)}
                        >
                          {item.sizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      )}
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>€{shipping.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row">
                  <span>Discount ({discount}%)</span>
                  <span>-€{(subtotal * (discount / 100)).toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>The amount is debited in €.</span>
              </div>
              <button className="checkout-button">
                PROCEED TO CHECKOUT
              </button>

              <div className="promo-code">
                <h3 className="promo-code-title">Promotional Code</h3>
                <div className="promo-code-input">
                  <input
                    type="text"
                    className="promo-input"
                    placeholder="Enter promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <button className="apply-button" onClick={handleApplyPromo}>
                    APPLY
                  </button>
                </div>
                {promoError && (
                  <p style={{ color: 'red', marginTop: '8px', fontSize: '14px' }}>{promoError}</p>
                )}
                {promoCode && (
                  <p style={{ color: 'green', marginTop: '8px', fontSize: '14px' }}>
                    Promo code applied successfully!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="features-section">
          <div className="feature-item">
            <h3 className="feature-title">EASY RETURNS</h3>
            <p className="feature-description">Take advantage of our easy return service if you're not satisfied with your order</p>
          </div>
          
          <div className="feature-item">
            <h3 className="feature-title">PAYMENTS</h3>
            <p className="feature-description">Choose among the safest and most common payment methods</p>
          </div>
          
          <div className="feature-item">
            <h3 className="feature-title">CULTURE AND RELIABILITY</h3>
            <p className="feature-description">A reliable and successful history in the fashion industry for over 50 years</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart; 