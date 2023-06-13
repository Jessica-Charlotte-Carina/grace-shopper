import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const TOKEN = 'token';

// async think to fetch order history
export const fetchOrderHistoryAsync = createAsyncThunk('orderhistory', async (userId) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      // make a get request to retrieve order history per user
      const res = await axios.get(`/api/orders/${userId}`);
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

// slice for order history
export const OrderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderHistoryAsync.fulfilled, (state, action) => {
      return action.payload; // update the state with fetched order history
    });
  },
});

export default OrderHistorySlice.reducer;
