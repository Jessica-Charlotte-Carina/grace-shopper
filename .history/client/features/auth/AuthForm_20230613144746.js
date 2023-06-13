import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = (props) => {
  const { name } = props;
  const { displayName } = props;
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    if (displayName === "Sign Up") {
      const email = evt.target.email.value;
      const address = evt.target.address.value;
      const cardNumber = evt.target.cardNumber.value;
      let valid = validateForm(username, password, email, address, cardNumber);
      if (valid) {
        dispatch(authenticate({ method: formName, username, password, email, address, cardNumber }));
      } else {
        alert("Please fill out form with appropriate data");
      }
    } else {
      dispatch(authenticate({ method: formName, username, password }));
    }
  };
}
  const validateForm = (username, password, email, address, cardNumber) => {
    let valid = true;
    if (email && (!email.includes("@") || !email.includes(".") || typeof email != "string" || email.length === 0 || email === undefined)) {
      valid = false;
    }

    if (typeof username != "string" || username.length === 0 || username === undefined) {
      valid = false;
    }

    if (typeof password != "string" || password.length === 0 || password === undefined) {
      valid = false;
    }

    if (address && typeof address != "string") {
      valid = false;
    }

    if (cardNumber && typeof cardNumber != "number") {
      valid = false;
    }

    return valid;
  }

  return (
    <div>
      <form className='LogIn' onSubmit={handleSubmit} name={name}>
        <div className='User'>
          <label htmlFor="username">
            <h4>Username:</h4>
          </label>
          <input name="username" type="text" required/>
        </div>
        <div className='UserPass'>
          <label htmlFor="password">
            <h4>Password:</h4>
          </label>
          <input name="password" type="password" required/>
        </div>
        <div className='UPSubmit'>
=======
        {displayName==="Sign Up"? 
          <div>git be
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="email" />
            </div>
            <div>
                <label htmlFor="address">
                  <small>Address</small>
                </label>
                <input name="address" type="text" />
            </div>
            <div>
              <label htmlFor="cardNumber">
                <small>Card Number</small>
              </label>
              <input name="cardNumber" type="text" />
            </div>
          </div>
        : <></> }
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
