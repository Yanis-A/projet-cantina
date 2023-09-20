import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalRecipes: 0,
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
  },
});

export const { setRecipes, setTotalRecipes } = globalPropsSlice.actions;

export default globalPropsSlice.reducer;
