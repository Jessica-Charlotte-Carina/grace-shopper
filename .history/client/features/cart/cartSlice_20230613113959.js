import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
  CONSTANT VARIABLES
*/
const TOKEN = 'token';

/*
  THUNKS
*/
export const placeOrder = createAsyncThunk('placeOrder', async ({userId, productsArray, number, total, tax, date}) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.post(`/api/orders/orderMyCart/${userId}`, {productsArray, number, total, tax, date});
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return 'There was an issue with your request.';
    }
  }
});

export const placeGuestOrder = createAsyncThunk('placeGuestOrder', async ({ productsArray, number, total, tax, date}) => {
  try {
     const res = await axios.post(`/api/orders/orderMyCart/guest`, {productsArray, number, total, tax, date});
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return 'There was an issue with your request.';
    }
  }
});

export const saveOrder = createAsyncThunk('saveOrder', async ({userId, cart}) => {
  const token = window.localStorage.getItem(TOKEN);

  try {
    if (token) {
      const res = await axios.post(`/api/users/saveMyCart/${userId}`, {cart});
      return res.data;
    } else {
      return [];
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return 'There was an issue with your request.';
    }
  }
});

export const getCart = createAsyncThunk('getCart', async (userId) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get(`/api/users/getMyCart/${userId}`);
      return res.data;
    } else {
      return [];
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return 'There was an issue with your request.';
    }
  }
});

export const savedCart = createSlice({
  name: 'savedCart',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(saveOrder.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});


/*
  REDUCER
*/
export default savedCart.reducer;
