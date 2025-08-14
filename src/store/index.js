import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer, { addToCart, updateQuantity, removeFromCart, clearCart } from './cartSlice';
import uiReducer from './uiSlice';
import { localStorageUtils } from '../utils/localStorage';

const preloadedCartItems = typeof window !== 'undefined' ? localStorageUtils.getCart() : [];

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(addToCart, updateQuantity, removeFromCart, clearCart),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    try {
      localStorageUtils.saveCart(state.cart.cartItems);
    } catch (error) {
      // ignore persistence errors
    }
  },
});

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
  preloadedState: {
    cart: {
      cartItems: preloadedCartItems,
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});