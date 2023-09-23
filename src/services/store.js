import { configureStore } from "@reduxjs/toolkit";
import globalPropsReducer from "./slices";

const store = configureStore({
  reducer: {
    globalProps: globalPropsReducer,
  },
  preloadedState: {
    globalProps: {
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
      createdrecipeTitle: "",
    },
  },
});

export default store;
