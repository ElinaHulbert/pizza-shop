import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";

//creating a store
export const store = configureStore({
  reducer: { filter },
});
console.log("store", store);
