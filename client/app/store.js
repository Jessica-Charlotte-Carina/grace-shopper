import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, // Add the cart reducer to the root reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
