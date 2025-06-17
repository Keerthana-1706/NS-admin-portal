import React, { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import menWomenImage from '../img/men.png';  // Import the image directly
import '../styles/ProductList.css';

const ProductList = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const products = [
    {
      id: 1,
      brand: 'H&M',
      name: 'Regular Fit Cashmere jumper',
      price: 3199,
      originalPrice: 7999,
      discount: 60,
      image: menWomenImage,
      description: 'A luxurious cashmere jumper with a regular fit. Made from 100% pure cashmere, this jumper offers exceptional softness and warmth.',
      colors: ['Black', 'Navy', 'Beige', 'Gray'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      details: [
        '100% pure cashmere',
        'Regular fit',
        'Ribbed cuffs and hem',
        'Machine washable',
        'Available in multiple colors'
      ]
    },
    {
      id: 2,
      brand: 'H&M',
      name: 'Regular Fit Cashmere jumper',
      price: 3199,
      originalPrice: 7999,
      discount: 60,
      image: menWomenImage,
      description: 'A luxurious cashmere jumper with a regular fit. Made from 100% pure cashmere, this jumper offers exceptional softness and warmth.',
      colors: ['Black', 'Navy', 'Beige', 'Gray'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      details: [
        '100% pure cashmere',
        'Regular fit',
        'Ribbed cuffs and hem',
        'Machine washable',
        'Available in multiple colors'
      ]
    },
    {
      id: 3,
      brand: 'H&M',
      name: 'Regular Fit Cashmere jumper',
      price: 3199,
      originalPrice: 7999,
      discount: 60,
      image: menWomenImage,
      description: 'A luxurious cashmere jumper with a regular fit. Made from 100% pure cashmere, this jumper offers exceptional softness and warmth.',
      colors: ['Black', 'Navy', 'Beige', 'Gray'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      details: [
        '100% pure cashmere',
        'Regular fit',
        'Ribbed cuffs and hem',
        'Machine washable',
        'Available in multiple colors'
      ]
    },
    // Add more products as needed
  ];

  return (
    <section className="products-section" ref={sectionRef}>
      <div>
        <h2 className="section-title ">Fresh Arrivals</h2>
        <div className="product-list-container">
          <div className="product-grid">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList; 