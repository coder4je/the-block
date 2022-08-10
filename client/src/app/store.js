import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { UserSlice } from "../features/user/UserSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // user: UserSlice.reducer,
  },
});
