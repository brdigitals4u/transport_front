import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Ensure 'counter' is correctly defined here
  },
});

// ✅ Correctly define RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
