//склад для производства кусочка пирога и его начинки вместе с инструкциями.
import { createSlice } from "@reduxjs/toolkit"; //destructuring since there is no import default
const initialState = {
  categoryId: 55,
  sort: {
    name: "popularity",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      //can be created as an arrow function as well, but can be left as a method
      state.categoryId = action.payload; //we will get the payload when dispatch setCategoryId and redux will set the payload to state
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
}); //created action in filterSlice slice reducer and exported it below
console.log(filterSlice, "filterslice");

export default filterSlice.reducer;
export const { setCategoryId, setSort } = filterSlice.actions || {}; //get out actions for future dispatch
