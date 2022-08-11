import React from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducer: {},
  extraReducers: {},
});

export const userSelector = (state) => state.user;

// export const signupUser = createAsyncThunk(
//   "users/"
// )
