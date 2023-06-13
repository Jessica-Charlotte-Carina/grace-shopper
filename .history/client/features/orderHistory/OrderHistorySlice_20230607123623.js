import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
  CONSTANT VARIABLES
*/
const TOKEN = 'token';

/*
  THUNKS
*/
export const fetchOrderHistoryAsync = createAsyncThunk('orderhistory', async (userId) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
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

/*
  SLICE
*/
export const OrderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderHistoryAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});


/*
  REDUCER
*/
export default OrderHistorySlice.reducer;
