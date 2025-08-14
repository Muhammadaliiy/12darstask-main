import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsImageErrorById, setImageError } from '../store/uiSlice';

const ProductCard = ({ product, onAddToCart, quantity, onUpdateQuantity }) => {
  const dispatch = useDispatch();
  const imageError = useSelector((state) => selectIsImageErrorById(state, product.id));

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleIncrease = () => {
    onUpdateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    onUpdateQuantity(product.id, quantity - 1);
  };

  const handleImageError = () => {
    dispatch(setImageError(product.id));
  };

  const getImageElement = () => {
    if (imageError) {
      return (
        <div className="product-image-placeholder">
          <div className="placeholder-content">
            <h3>{product.name}</h3>
            <p>{product.category}</p>
          </div>
        </div>
      );
    }

    return (
      <picture>
        <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
        <source media="(min-width: 768px)" srcSet={product.image.tablet} />
        <source media="(max-width: 767px)" srcSet={product.image.mobile} />
        <img
          src={product.image.desktop}
          alt={product.name}
          className="product-image"
          onError={handleImageError}
        />
      </picture>
    );
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {getImageElement()}

        {quantity === 0 ? (
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <img src="/assets/icon-add-to-cart.svg" alt="Add to cart" />
            Add to Cart
          </button>
        ) : (
          <div className="quantity-controls">
            <button className="quantity-btn decrease" onClick={handleDecrease}>
              <img src="/assets/icon-decrement-quantity.svg" alt="Decrease" />
            </button>
            <span className="quantity">{quantity}</span>
            <button className="quantity-btn increase" onClick={handleIncrease}>
              <img src="/assets/icon-increment-quantity.svg" alt="Increase" />
            </button>
          </div>
        )}
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
