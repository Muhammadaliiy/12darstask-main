import React from 'react';

const OrderConfirmationModal = ({ isOpen, cartItems, totalPrice, onStartNewOrder, onClose }) => {
  if (!isOpen) return null;

  
  const getImageSrc = (imagePath) => {
    return imagePath ? imagePath.replace('../', '') : '/images/placeholder.jpg';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <img src="../assets/icon-order-confirmed.svg" alt="Order confirmed" />
          <h2>Order Confirmed</h2>
          <p>We hope you enjoy your food!</p>
        </div>
        
        <div className="order-summary">
          {cartItems.map(item => (
            <div key={item.id} className="order-item">
              <div className="order-item-image">
                <img src={getImageSrc(item.image.thumbnail)} alt={item.name} />
              </div>
              <div className="order-item-info">
                <h4 className="order-item-name">{item.name}</h4>
                <div className="order-item-details">
                  <span className="order-item-quantity">{item.quantity}x</span>
                  <span className="order-item-price">@ ${item.price.toFixed(2)}</span>
                </div>
              </div>
              <span className="order-item-total">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          
          <div className="order-total">
            <span>Order Total</span>
            <span className="total-price">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <button className="start-new-order-btn" onClick={onStartNewOrder}>
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;