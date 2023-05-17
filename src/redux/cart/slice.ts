import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLocalstorage } from "../../utils/getCartFromLocalstorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartSliceState } from "./types";
import { CartItem } from "./types";

const initialState: CartSliceState = getCartFromLocalstorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      // console.log("q", state.items);
      if (findItem) {
        findItem.count++;
        console.log(findItem);
      } else {
        state.items.push({ ...action.payload, count: 1 }); //taking everything we are getting from the component and adding only one item to store at the end
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter((obj) =>
        // obj.id !== action.payload.id &&
        // obj.type !== action.payload.type &&
        // obj.size !== action.payload.size
        console.log(obj)
      );
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, minusItem, clearItems } =
  cartSlice.actions || {};
