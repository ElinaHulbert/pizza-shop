import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";

//creating a store
export const store = configureStore({
  reducer: { filter: filterReducer },
});
