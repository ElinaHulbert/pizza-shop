import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import Sort from "src/components/Sort";
import { fetchPizzas } from './asyncActions';
import { PizzaItem, PizzaSliceState, Status,} from './types';

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};



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
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
  },
});

export default pizzaSlice.reducer;
export const { setItems } = pizzaSlice.actions || {};