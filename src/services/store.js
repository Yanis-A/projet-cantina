import { configureStore } from "@reduxjs/toolkit";
import globalPropsReducer from "./slices";

const store = configureStore({
  reducer: {
    globalProps: globalPropsReducer,
  },
  preloadedState: {
    globalProps: {},
  },
});

export default store;
