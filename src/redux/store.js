//кухня, где получают инструкцию от компании, производят начинку и возвращают ее для компании, чтобы ее могли использовать
import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzasSlice";

//creating a store
export const store = configureStore({
  reducer: { filter, cart, pizza },
});
