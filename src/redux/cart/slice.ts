import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLocalstorage } from '../../utils/getCartFromLocalstorage';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartSliceState } from './types';
import { CartItem} from './types';

 
const initialState: CartSliceState = getCartFromLocalstorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 }); //taking everything we are getting from the component and adding only one item to store at the end
      }
      state.totalPrice = calcTotalPrice(state.items)
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});


export default cartSlice.reducer;
export const { addItem, removeItem, minusItem, clearItems } =
  cartSlice.actions || {};
