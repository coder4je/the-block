import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/auth/userSlice";

export const store = configureStore({
  reducer: { user: userSlice.reducer },
});
