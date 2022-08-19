import { createSlice } from "@reduxjs/toolkit";

//initial state as if in useState(0)
//this object can have any amount and various properties
const initialState = {
  value: 0,
};

//logic that handles the state
export const filterSlice = createSlice({
  //creating slice with this function which we take from redux toolkit library
  name: "filter", //the name of our slice
  initialState, //the initial state
  reducers: {
    //actions that will change the state
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});
//exporting methods to be able to use them in another components
//filterSlice.actions will contain increment, decrement and incrementByAmount
export const { increment, decrement, incrementByAmount } = filterSlice.actions;
//reducer is responsible for the state change
export default filterSlice.reducer;
