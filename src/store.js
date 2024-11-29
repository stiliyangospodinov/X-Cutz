import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

const saveToLocalStorage = (state) => {
    localStorage.setItem('cart', JSON.stringify(state));
  };
  
  const loadFromLocalStorage = () => {
    const savedState = localStorage.getItem('cart');
    return savedState ? JSON.parse(savedState) : { items: [] };
  };
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadFromLocalStorage(),
  },
});

store.subscribe(() => {
  saveToLocalStorage(store.getState().cart);
});
