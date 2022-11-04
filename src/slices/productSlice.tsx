import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import data from "../db/data.json";
import { Product } from "../type/type";
export const getProducts = createAsyncThunk("getProduct", async () => {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return data.data;
});

interface InitialState {
  filter: string;
  shoppingCart: Product[];
  selectedColor: string;
  isLoading: Boolean;
  searchedProducts: Product[];
  products: Product[];
}

const initialState: InitialState = {
  filter: "All",
  shoppingCart: [],
  selectedColor: "",
  isLoading: false,
  searchedProducts: [],
  products: [],
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setShoppingCart: (state, action: PayloadAction<Product[]>) => {
      state.shoppingCart = action.payload;
    },
    setSelectedColor: (state, action: PayloadAction<string>) => {
      state.selectedColor = action.payload;
    },
    setSearchedProducts: (state, action: PayloadAction<Product[]>) => {
      state.searchedProducts = action.payload;
    },
  },

  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.isLoading = false;
    },
  },
});
export const {
  setFilter,
  setShoppingCart,
  setSelectedColor,
  setSearchedProducts,
} = productSlice.actions;

export default productSlice.reducer;
