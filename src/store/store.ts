import { configureStore } from "@reduxjs/toolkit";
import { featuresReducer } from "../features/features";

export const store = configureStore({
  reducer: featuresReducer,
});
