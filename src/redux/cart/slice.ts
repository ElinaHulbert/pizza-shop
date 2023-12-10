import { calcTotalPrice, minusTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLocalstorage } from "../../utils/getCartFromLocalstorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartSliceState } from "./types";
import { CartItem, ItemIdentifier } from "./types";

const initialState: CartSliceState = getCartFromLocalstorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      );
    
      if (existingItem) {
        existingItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
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
    removeItem(state, action: PayloadAction<ItemIdentifier>) {
      state.items = state.items.filter((obj) =>
        obj.id !== action.payload.id ||
        obj.type !== action.payload.type ||
        obj.size !== action.payload.size
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
