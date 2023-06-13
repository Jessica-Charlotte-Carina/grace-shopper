import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder, placeGuestOrder } from "./cartSlice";

const Checkout = () => {
  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const [guestCheckout, setGuestCheckout] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreditCard((prevCreditCard) => ({
      ...prevCreditCard,
      [name]: value,
    }));
  };

  const handleGuestInfoChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo((prevGuestInfo) => ({
      ...prevGuestInfo,
      [name]: value,
    }));
  };

  const handleGuestCheckout = () => {
    setGuestCheckout(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const number = generateOrderNumber();
    setOrderNumber(number);
    setOrderCompleted(true);

    let productsArray = JSON.parse(sessionStorage.getItem("productsArray"));
    let total = JSON.parse(sessionStorage.getItem("total"));
    let tax = total * .1;
    let d = new Date();
    let date = d.getDate();

    if (!guestCheckout) {
<<<<<<< HEAD
      // order for logged-in user
      dispatch(placeOrder({userId, productsArray, number, total, tax, date}));
    } else {
      // order for guest user
      dispatch(placeGuestOrder({userId, productsArray, number, total, tax, date}));
=======
      let valid = validateCheckout();
      if (valid) {
        dispatch(placeOrder({userId, productsArray, number, total, tax, date}));
      } else {
        alert("Please fill out form with appropriate data");
      }
    } else {
      let valid = validateCheckout() && validateGuest();
      if (valid) {
        dispatch(placeGuestOrder({productsArray, number, total, tax, date}));
      } else {
        alert("Please fill out form with appropriate data");
      }
>>>>>>> 275a05326c661920c73b48b84a13a6ea70acbdca
    }

    setCreditCard({
      cardNumber: "",
      cardHolder: "",
      expirationDate: "",
      cvv: "",
    });

    setGuestInfo({
      firstName: "",
      lastName: "",
      email: "",
    });
    sessionStorage.removeItem("cart");
  };

  const generateOrderNumber = () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return randomNumber;
  };

  const validateCheckout = () => {
    let valid = true;

    if (typeof creditCard.cardNumber != "number") {
      valid = false;
    }

    if (typeof creditCard.cardHolder != "string") {
      valid = false;
    }

    if (!creditCard.expirationDate.includes("/")) {
      valid = false;
    }

    return valid;
  }

  const validateGuest = () => {
    let valid = true;

    if (typeof guestInfo.firstName != "string") {
      valid = false;
    }

    if (typeof guestInfo.lastName != "string") {
      valid = false;
    }

    if (!guestInfo.email.includes("@") || !guestInfo.email.includes(".") || typeof guestInfo.email != "string" ) {
      valid = false;
    }

    return valid;
  }

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Checkout</h2>
          <div>
            <h3>Welcome!</h3>
            <p>Please proceed with your payment information.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={creditCard.cardNumber}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Card Holder:
              <input
                type="text"
                name="cardHolder"
                value={creditCard.cardHolder}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Expiration Date:
              <input
                type="text"
                name="expirationDate"
                value={creditCard.expirationDate}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              CVV:
              <input
                type="text"
                name="cvv"
                value={creditCard.cvv}
                onChange={handleChange}
                maxLength={4}
                required
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
          {orderCompleted && (
            <div>
              <h3>We got it!</h3>
              <h4>Order number: #{orderNumber}</h4>
              <p>Your package is being processed and will shortly be shipped.</p>
              <p>
                To check your order history, please click{" "}
                <Link to="/orderHistory">here</Link>.
              </p>
            </div>
          )}
        </div>
      ) : (
        !guestCheckout && (
          <div>
            <h2>Checkout</h2>
            <div className="checkout-options">
              <div className="option sign-in-sign-up">
                <h3>Log In or Sign Up</h3>
                <p>Log in or create an account to proceed with the checkout.</p>
                {/* <button onClick={handleUserLogin}>Log In</button> |{" "}
                 */}   
                  <button>
                    <Link to="/login">Log In</Link>
                    </button>
                    <button>
                    <Link to="/signup">Sign Up</Link>
                  </button>
              </div>
              <div className="option guest-checkout">
                <h3>Continue as Guest</h3>
                <p>Proceed with the checkout as a guest.</p>
                <button onClick={handleGuestCheckout}>Continue as Guest</button>
              </div>
            </div>
          </div>
        )
      )}

      {guestCheckout && (
        <div className='guest-checkout'>
          <h2>Guest Checkout</h2>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={guestInfo.firstName}
                onChange={handleGuestInfoChange}
                required
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={guestInfo.lastName}
                onChange={handleGuestInfoChange}
                required
              />
            </label>
            <br />
            <label>
              Email Address:
              <input
                type="email"
                name="email"
                value={guestInfo.email}
                onChange={handleGuestInfoChange}
                required
              />
            </label>
            <br />
            <h3>Payment Information</h3>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={creditCard.cardNumber}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Card Holder:
              <input
                type="text"
                name="cardHolder"
                value={creditCard.cardHolder}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Expiration Date:
              <input
                type="text"
                name="expirationDate"
                value={creditCard.expirationDate}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              CVV:
              <input
                type="text"
                name="cvv"
                value={creditCard.cvv}
                onChange={handleChange}
                maxLength={4}
                required
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
          {orderCompleted && (
            <div>
              <h3>We got it!</h3>
              <h4>Order number: #{orderNumber}</h4>
              <p>Your package is being processed and will shortly be shipped.</p>
              <p>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkout;