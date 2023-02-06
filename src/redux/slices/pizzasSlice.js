import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  items: [],
  status: "loading",
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkAPI) => {
    const { category, sortBy, currentPage, order, search } = params;
    let url;
    if (currentPage === undefined || isNaN(currentPage)) {
      url = `https://62f0eef1e2bca93cd240319f.mockapi.io/items?page=1&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;
    } else {
      url = `https://62f0eef1e2bca93cd240319f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;
    }
    const { data } = await axios.get(url);
    if (data.length === 0) {
      return thunkAPI.rejectWithValue("Empty data");
    }
    console.log("thunkAPI", thunkAPI);
    return thunkAPI.fulfillWithValue(data);
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = "error";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
  },
});

export default pizzaSlice.reducer;
export const { setItems } = pizzaSlice.actions || {};
