import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../weatherAPISlice";
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
