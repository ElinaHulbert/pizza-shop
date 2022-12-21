import { createSlice } from "@reduxjs/toolkit"; //destructuring since there is no import default
const initialState = {
  categoryId: 55,
  sort: {
    name: "popularity",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      console.log("action", action);
      //can be created as an arrow function as well, but can be left as a method
      state.categoryId = action.payload; //we will get the payload when dispatch setCategoryId and redux will set the payload to state
    },
  },
});
console.log(filterSlice, "filterslice");

export const { setCategoryId } = filterSlice.actions || {}; //get out actions for future dispatch
export default filterSlice.reducer;
