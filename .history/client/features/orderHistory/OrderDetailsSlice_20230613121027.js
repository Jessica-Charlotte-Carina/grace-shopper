import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const TOKEN = 'token';

// async thunk to fetch order details
export const fetchOrderDetails = createAsyncThunk('orderDetails', async (orderId) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {      
      console.log(orderId);

      // make a get request to retrieve order details using the orderId
      const res = await axios.get(`/api/orders/orderDetails/${orderId}`);
      return res.data;
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

// slice for order details
export const OrderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderDetails.fulfilled, (state, action) => {
        return action.payload; // update state
      });
  },
});

export default OrderDetailsSlice.reducer;