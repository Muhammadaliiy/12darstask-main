import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart, getItemQuantity, onUpdateQuantity }) => {
  return (
    <div className="product-list">
      <h1>Desserts</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={getItemQuantity(product.id)}
            onAddToCart={onAddToCart}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;