import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  lastRecipe: 0,
  openedPopoverId: null,
  searchFields: {
    title: "",
    portions: { min: null, max: null },
    level: [],
    maxDuration: null,
  },
  banner: {
    type: "",
    message: "",
    uuid: "",
  },
};

const globalPropsSlice = createSlice({
  name: "globalProps",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setLastRecipe: (state, action) => {
      state.lastRecipe = action.payload;
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
    resetSearchFields: (state) => {
      state.searchFields = initialState.searchFields;
    },
    setBanner: (state, action) => {
      state.banner = action.payload;
    },
  },
});

export const { setRecipes, setLastRecipe, setOpenedPopoverId, setSearchFields, setSearchTitle, setSearchPortionsMin, setSearchPortionsMax, addSearchLevel, removeSearchLevel, setSearchMaxDuration, resetSearchFields, setBanner } = globalPropsSlice.actions;

export default globalPropsSlice.reducer;
