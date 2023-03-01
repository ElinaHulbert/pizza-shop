import { createSlice, PayloadAction } from "@reduxjs/toolkit"; //destructuring since there is no import default
import { FilterSliceState, Sort, SortPropertyEnum } from './types';


const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: "",
  currentPage: "1",
  sort: {
    name: "popularity",
    sortProperty: SortPropertyEnum.PRICE_DESC,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      //can be created as an arrow function as well, but can be left as a method
      state.categoryId = action.payload; //we will get the payload when dispatch setCategoryId and redux will set the payload to state
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<string>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = action.payload.currentPage;
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
}); //created action in filterSlice slice reducer and exported it below
export default filterSlice.reducer;
export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions || {}; //get out actions for future dispatch