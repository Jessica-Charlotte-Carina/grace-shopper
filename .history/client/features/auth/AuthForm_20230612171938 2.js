import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div>
      <form className='LogIn' onSubmit={handleSubmit} name={name}>
        <div className='UserPass'>
          <label htmlFor="username">
            <h4>Username:</h5>
          </label>
          <input name="username" type="text" />
        </div>
        <div className='UserPass'>
          <label htmlFor="password">
            <h4>Password:</h5>
          </label>
          <input name="password" type="password" />
        </div>
        <div className='UPSubmit'>
          <button type="submit">{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
