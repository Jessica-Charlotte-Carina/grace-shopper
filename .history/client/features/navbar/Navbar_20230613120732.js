import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  // checks if user is logged in
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // redirects user logout to login page
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <h1>🌸 JCC Flower Shop 🌸</h1>
        {isLoggedIn ? ( // nav bar for users that are logged in
          <div>
            <Link to="/home">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orderHistory">Order History</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/products">Flowers</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;