import { configureStore } from "@reduxjs/toolkit";
import globalPropsReducer from "./slices";

const store = configureStore({
  reducer: {
    globalProps: globalPropsReducer,
  },
  preloadedState: {
    globalProps: {
      recipes: [],
      totalRecipes: 0,
      openedPopoverId: null,
    },
  },
});

export default store;
