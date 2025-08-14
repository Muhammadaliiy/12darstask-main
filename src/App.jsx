import React, { useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProducts, selectLoading, selectError } from './store/productsSlice';
import { addToCart, updateQuantity, removeFromCart, clearCart, selectCartItems, selectTotalItems, selectTotalPrice } from './store/cartSlice';
import { openModal, closeModal, selectShowModal } from './store/uiSlice';

function App() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);
  const showModal = useSelector(selectShowModal);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleConfirmOrder = () => {
    dispatch(openModal());
  };

  const handleStartNewOrder = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
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
            onAddToCart={(product) => dispatch(addToCart(product))}
            getItemQuantity={getItemQuantity}
            onUpdateQuantity={(productId, newQuantity) => dispatch(updateQuantity({ productId, newQuantity }))}
          />
        </main>
        
        <aside className="sidebar">
          <Cart
            cartItems={cartItems}
            totalItems={totalItems}
            totalPrice={totalPrice}
            onUpdateQuantity={(productId, newQuantity) => dispatch(updateQuantity({ productId, newQuantity }))}
            onRemoveItem={(productId) => dispatch(removeFromCart(productId))}
            onConfirmOrder={handleConfirmOrder}
          />
        </aside>
      </div>

      <OrderConfirmationModal
        isOpen={showModal}
        cartItems={cartItems}
        totalPrice={totalPrice}
        onStartNewOrder={handleStartNewOrder}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
