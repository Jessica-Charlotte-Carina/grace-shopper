import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { removeFromStorage } from "../products/ProductSlice";
import { v4 as uuidv4 } from 'uuid';
import { saveOrder, getCart } from "./cartSlice";
import { useSelector, useDispatch } from 'react-redux';
import { updateStorage } from "../products/ProductSlice";

const Cart = () => {
  const [quantities, setQuantities] = useState([]);
  const [cart, setCart] = useState([]); //this will be sent to the backend since the id is easier to track
  const savedCart = useSelector((state) => state.savedCart);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const [cartUpdate, setCartUpdate] = useState(false);
  
  // Set default quantities
  useEffect(() => {
    dispatch(getCart(userId))
    setDefault();
    setCartUpdate(false);
  }, [cartUpdate])

  const setDefault = () => {
    const cartItems = JSON.parse(sessionStorage.getItem("cart"));
    if (cartItems && cartItems.length > 0) {
      const cartArr = [[cartItems[0].id, 1]];
      const quantitiesArr = [[cartItems[0], 1]];
      for (let i = 1; i < cartItems.length; i++) {
        let cartArrLength = cartArr.length;
        let found = false;
        for (let j = 0; j < cartArrLength; j++) {
          if (cartArr[j][0] === cartItems[i].id) {
            cartArr[j][1]++;
            quantitiesArr[j][1]++;
            found = true;
          }
        }
        if (found === false) {
          quantitiesArr.push([cartItems[i], 1]);
          cartArr.push([cartItems[i].id, 1]);
        }
      }
      setCart(cartArr);
      setQuantities(quantitiesArr);
    }
  }

  // Function to update quantity for a product
  const handleQuantityChange = (productId, quantity) => {
    let quantitiesArrCopy = [...quantities];
    let cartArrCopy = [...cart];
    for (let i = 0; i < cartArrCopy.length; i++) {
      if (cartArrCopy[i][0] === productId) {
        cartArrCopy[i][1] = quantity;
        quantitiesArrCopy[i][1] = quantity;
        break;
      }
    }
    setCart(cartArrCopy);
    setQuantities(quantitiesArrCopy);
  };

  const handleRemoveItem = (productId) => {
    removeFromStorage(productId);
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    let subtotal = 0;
    for (let i = 0; i < quantities.length; i++) {
      const quantity = quantities[i][1];
      const price = quantities[i][0].price;
      subtotal += price * quantity;
    }
    return subtotal.toFixed(2);
  };

  // Calculate total
  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = subtotal * 0.1;
    const shipping = 5.95;
    const total = subtotal + tax + shipping;
    return total.toFixed(2);
  };

  // Save cart to database for persisting cart
  const handleSave = () => {
    dispatch(saveOrder({userId, cart}));
    sessionStorage.removeItem('cart');
  }

  const handleLoad = () => {
    updateStorage(savedCart);
    setCartUpdate(true);
  }

  return (
    <div className="cart-div">
      <h2 className = "title" id="header-cart">🌹 Cart 🌹</h2>
      {!quantities && savedCart.length===0? (
        <p>No items in the cart</p>
      ) : (
        <div className="cart">
          <ul id="cart-items">
            <li id="cart-header">
              <div className="cart-item-header">Flower</div>
              <div className="cart-item-header">Quantity</div>
              <div className="cart-item-header">Price</div>
              <div className="cart-item-header">Remove</div>
            </li>
            {quantities.map((itemArr) => {
              const item = itemArr[0];
              const quantity = itemArr[1];
              const totalPrice = item.price;

              return (
                <li key={uuidv4()} className="cart-item">
                  <div className="cart-item-name">{item.name}</div>
                  <div>
                    <select
                      defaultValue={quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                    >
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="cart-item-price">
                    ${totalPrice.toFixed(2)}
                  </div>
                  <div>
                    <button onClick={() => handleRemoveItem(item.id)}>X</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div id="cost-box">
            <p>Subtotal: ${calculateSubtotal()}</p>
            <p>Tax (10%): ${(parseFloat(calculateSubtotal()) * 0.1).toFixed(2)}</p>
            <p>Shipping: $5.95</p>
            <p id="total-amount">
              Total: ${calculateTotal()}
            </p>
            <div className="cart-buttons">
              <button onClick = {() => handleSave()}>Save Cart</button>
              <button onClick = {() => handleLoad()}>Load Saved Cart</button>
              </div>
              <Link to="/checkout" >
                <button>Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;