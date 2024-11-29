import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    
    addItem(state, action) {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
      },

      removeItem(state, action) {
        const item = state.items.find(item => item.id === action.payload.id);
        
        if (item) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            state.items = state.items.filter(item => item.id !== action.payload.id);
          }
        }
      },

      clearCart(state) {
        state.items = [];
      },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
