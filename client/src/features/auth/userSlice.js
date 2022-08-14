import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ username, email, password, phone_number, picture }) => {
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phone_number,
          picture,
        }),
      });
      let data = await response.json();
      console.log("data", data);
    } catch (e) {
      console.log("Error", e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let data = await response.json();
      console.log("response", data);
    } catch (e) {
      console.log("Error", e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
