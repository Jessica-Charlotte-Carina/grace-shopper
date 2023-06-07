import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
// import {logout} from "../../"

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me?.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <h1>JCC Flower Shop</h1>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
            <Link to="/cart">Cart</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
