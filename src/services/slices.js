import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  totalRecipes: 0,
  openedPopoverId: null,
};

const globalPropsSlice = createSlice({
  name: "globalProps",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setTotalRecipes: (state, action) => {
      state.totalRecipes = action.payload;
    },
    setOpenedPopoverId: (state, action) => {
      state.openedPopoverId = action.payload;
    },
  },
});

export const { setRecipes, setTotalRecipes, setOpenedPopoverId } = globalPropsSlice.actions;

export default globalPropsSlice.reducer;
