import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export type CartItem={
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  imageUrl: string;
  count: number;
  totalPrice: number | number[];
}

interface CartSliceState {
  totalPrice: number;
  items: CartItem[]
}
const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

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
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum; //sum is the previous sum we had in cart
      }, 0);
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export default cartSlice.reducer;
export const { addItem, removeItem, minusItem, clearItems } =
  cartSlice.actions || {};
