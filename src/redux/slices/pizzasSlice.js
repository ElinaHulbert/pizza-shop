import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "./userAPI";
import axios from "axios";
const initialState = {
  items: [],
};

const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (userId, thunkAPI) => {
    if (currentPage === undefined || isNaN(currentPage)) {
      url = `https://62f0eef1e2bca93cd240319f.mockapi.io/items?page=1&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;
    } else {
      url = `https://62f0eef1e2bca93cd240319f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;
    }
    const { data } = await axios.get(url);
    return data;
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
});

export default pizzaSlice.reducer;
export const { setItems } = pizzaSlice.actions || {};
