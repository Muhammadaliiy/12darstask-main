import React from 'react';

const Cart = ({ cartItems, totalItems, totalPrice, onUpdateQuantity, onRemoveItem, onConfirmOrder }) => {
  if (totalItems === 0) {
    return (
      <div className="cart">
        <h2>Your Cart ({totalItems})</h2>
        <div className="empty-cart">
          <img src="../assets/illustration-empty-cart.svg" alt="Empty cart" />
          <p>Your added items will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart ({totalItems})</h2>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <h4 className="cart-item-name">{item.name}</h4>
              <div className="cart-item-details">
                <span className="cart-item-quantity">{item.quantity}x</span>
                <span className="cart-item-price">@ ${item.price.toFixed(2)}</span>
                <span className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
            <button 
              className="remove-item-btn"
              onClick={() => onRemoveItem(item.id)}
            >
              <img src="../assets/icon-remove-item.svg" alt="Remove item" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-total">
        <span>Order Total</span>
        <span className="total-price">${totalPrice.toFixed(2)}</span>
      </div>
      
      <div className="carbon-neutral">
        <img src="../assets/icon-carbon-neutral.svg" alt="Carbon neutral" />
        <p>This is a <strong>carbon-neutral</strong> delivery</p>
      </div>
      
      <button className="confirm-order-btn" onClick={onConfirmOrder}>
        Confirm Order
      </button>
    </div>
  );
};

export default Cart;