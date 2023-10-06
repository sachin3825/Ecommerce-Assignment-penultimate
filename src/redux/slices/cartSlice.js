import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const productIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex !== -1) {
        state.splice(productIndex, 1);
      }
    },
    clearCart: (state) => {
      state.length = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
