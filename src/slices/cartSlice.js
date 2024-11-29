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
          // Ако артикулът вече съществува, увеличи количеството
          existingItem.quantity += 1;
        } else {
          // Ако артикулът не съществува, добави го като нов
          state.items.push({ ...action.payload, quantity: 1 });
        }
      },
      removeItem(state, action) {
        const item = state.items.find(item => item.id === action.payload.id);
        
        if (item) {
          if (item.quantity > 1) {
            // Ако количеството е по-голямо от 1, намали количеството
            item.quantity -= 1;
          } else {
            // Ако количеството е 1, премахни артикула
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
