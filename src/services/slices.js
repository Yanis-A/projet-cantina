import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  totalRecipes: 0,
  openedPopoverId: null,
  searchFields: {
    title: "",
    portions: { min: null, max: null },
    level: [],
    maxDuration: null,
  },
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
    setSearchFields: (state, action) => {
      state.searchFields = action.payload;
    },
    setSearchTitle: (state, action) => {
      state.searchFields.title = action.payload;
    },
    setSearchPortionsMin: (state, action) => {
      state.searchFields.portions.min = action.payload;
    },
    setSearchPortionsMax: (state, action) => {
      state.searchFields.portions.max = action.payload;
    },
    addSearchLevel: (state, action) => {
      state.searchFields.level.push(action.payload);
    },
    removeSearchLevel: (state, action) => {
      state.searchFields.level = state.searchFields.level.filter((level) => level !== action.payload);
    },
    setSearchMaxDuration: (state, action) => {
      state.searchFields.maxDuration = action.payload;
    },
  },
});

export const { setRecipes, setTotalRecipes, setOpenedPopoverId, setSearchFields, setSearchTitle, setSearchPortionsMin, setSearchPortionsMax, addSearchLevel, removeSearchLevel, setSearchMaxDuration } = globalPropsSlice.actions;

export default globalPropsSlice.reducer;
