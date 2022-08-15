import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice";
import projectReducer from "../features/project/projectReducer";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    user: userReducer,
  },
});
