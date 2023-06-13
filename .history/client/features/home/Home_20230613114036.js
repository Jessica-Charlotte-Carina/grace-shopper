import React from "react";
import { useSelector } from "react-redux";
import Products from "../products/Products";

const Home = () => {
  const username = useSelector((state) => state.auth.me.username);

  const capitalizedUsername = username ? username.charAt(0).toUpperCase() + username.slice(1) : '';

  return (
    <div id="homeContainer">
      <h2 className="title">
        {username ? `🌼 Hello, ${capitalizedUsername}! 🌼` : "🌼 Welcome! 🌼"}
      </h2>
      <Products />
    </div>
  );
};

export default Home;