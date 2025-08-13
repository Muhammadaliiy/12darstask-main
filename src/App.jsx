import React, { useState, useEffect } from 'react';
import { apiService } from './services/api';
import { useCart } from './hooks/useCart';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getItemQuantity
  } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const desserts = await apiService.getDesserts();
        setProducts(desserts);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleConfirmOrder = () => {
    setShowModal(true);
  };

  const handleStartNewOrder = () => {
    clearCart();
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <main className="main-content">
          <ProductList
            products={products}
            onAddToCart={addToCart}
            getItemQuantity={getItemQuantity}
            onUpdateQuantity={updateQuantity}
          />
        </main>
        
        <aside className="sidebar">
          <Cart
            cartItems={cartItems}
            totalItems={getTotalItems()}
            totalPrice={getTotalPrice()}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onConfirmOrder={handleConfirmOrder}
          />
        </aside>
      </div>

      <OrderConfirmationModal
        isOpen={showModal}
        cartItems={cartItems}
        totalPrice={getTotalPrice()}
        onStartNewOrder={handleStartNewOrder}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
