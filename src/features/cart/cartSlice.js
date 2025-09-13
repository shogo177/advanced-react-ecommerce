import { createSlice } from "@reduxjs/toolkit";

// Load initial cart from sessionStorage or use empty array
const initialCart = JSON.parse(sessionStorage.getItem("cart")) || { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1; // use "quantity"
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      sessionStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      sessionStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      sessionStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
