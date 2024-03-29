import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaItem, SearchPizzaParams} from './types';

export const fetchPizzas = createAsyncThunk(
    "pizza/fetchPizzasStatus",
    async (params: SearchPizzaParams, thunkAPI) => {
      const { category, sortBy, currentPage, order, search } = params;
      let url;
        url = `https://62f0eef1e2bca93cd240319f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;
      
      const { data } = await axios.get<PizzaItem[]>(url);
      if (data.length === 0) {
        return thunkAPI.rejectWithValue("Empty data");
      }
      return thunkAPI.fulfillWithValue(data);
    }
  ); 