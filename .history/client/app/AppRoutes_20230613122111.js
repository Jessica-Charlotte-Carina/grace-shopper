import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import OrderHistory from "../features/orderHistory/OrderHistory";
import { me } from "./store";
import Products from "../features/products/Products";
import Cart from "../features/cart/Cart";
import SingleProduct from "../features/products/SingleProducts";
import Checkout from "../features/cart/checkout";
import OrderDetails from "../features/orderHistory/OrderDetails";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch action to fetch the authenticated user's information
    dispatch(me());
  }, []);

  return (
    <div>
      <Routes>
        {/* Define routes based on user's authentication status */}
        <Route path="/*" element={<Home />} /> {/* Default route */}
        {isLoggedIn ? (
          <>
            {/* Routes for authenticated users */}
            <Route path="/home" element={<Home />} /> {/* Home page */}
            <Route path="/cart" element={<Cart />} /> {/* Shopping cart */}
            <Route path="/orderHistory" element={<OrderHistory />} /> {/* Order history */}
            <Route
              path="/orderHistory/:orderId"
              element={<OrderDetails />}
            />{" "}
            {/* Order details */}
          </>
        ) : (
          <>
            {/* Routes for unauthenticated users */}
            <Route
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />{" "}
            {/* Login form */}
            <Route
              path="/signup"
              element={<AuthForm name="signup" displayName="Sign Up" />}
            />{" "}
            {/* Signup form */}
          </>
        )}
        <Route path="/products" element={<Products />} /> {/* Product listing */}
        <Route
          path="/products/:productId"
          element={<SingleProduct />}
        />{" "}
        {/* Single product */}
        <Route path="/checkout" element={<Checkout />} /> {/* Checkout */}
        <Route path="/cart" element={<Cart />} /> {/* Shopping cart */}
      </Routes>
    </div>
  );
};

export default AppRoutes;