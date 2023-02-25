import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
type PizzaItem = {
  id: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  imageUrl: string;
  rating: number,
}
interface PizzaSliceState {
  items: PizzaItem[];
  status: "loading" | "success" | "error";
}

const initialState: PizzaSliceState = {
  items: [],
  status: "loading",
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: Record<string, string>, thunkAPI) => {
    const { category, sortBy, currentPage, order, search } = params;
    let url;
    if (currentPage) {
      url = `https://62f0eef1e2bca93cd240319f.mockapi.io/items?page=1&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;
    } else {
      url = `https://62f0eef1e2bca93cd240319f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;
    }
    const { data } = await axios.get<PizzaItem[]>(url);
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
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
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
