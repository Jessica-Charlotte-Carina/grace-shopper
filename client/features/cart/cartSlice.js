import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initial state of the cart items
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload); // Add the product to the cart items
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
