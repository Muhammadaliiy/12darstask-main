import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.cartItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    updateQuantity(state, action) {
      const { productId, newQuantity } = action.payload;
      const index = state.cartItems.findIndex(item => item.id === productId);
      if (index === -1) return;
      if (newQuantity <= 0) {
        state.cartItems.splice(index, 1);
      } else {
        state.cartItems[index].quantity = newQuantity;
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== productId);
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = state => state.cart.cartItems;
export const selectTotalItems = state => state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = state => state.cart.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectItemQuantity = (state, productId) => {
  const item = state.cart.cartItems.find(item => item.id === productId);
  return item ? item.quantity : 0;
};

export default cartSlice.reducer;