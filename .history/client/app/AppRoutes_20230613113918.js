import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import OrderHistory from '../features/orderHistory/OrderHistory'; 
import { me } from "./store";
import Products from "../features/products/Products";
import Cart from "../features/cart/Cart";
import SingleProduct from "../features/products/SingleProducts";
import Checkout from "../features/cart/checkout";
import OrderDetails from '../features/orderHistory/OrderDetails';
const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me()); }, []);

  return (
    <div>
      <Routes>
        <Route path="/*" element={<Home />} />
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orderHistory" element={<OrderHistory />} />
            <Route path="/orderHistory/:orderId" element={<OrderDetails />}/>
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/signup"
              element={<AuthForm name="signup" displayName="Sign Up" />}
            />
          </>
        )}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;