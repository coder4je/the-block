import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export function signupUser({
  username,
  email,
  password,
  phone_number,
  picture,
}) {
  return function (dispatch) {
    dispatch({ type: "user/signup/pending" });
    fetch("/api/signup", {
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
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "user/signup/fulfilled",
          payload: data,
        })
      );
  };
}
// export const signupUser = createAsyncThunk(
//   "user/signup",
//   async (
//     { username, email, password, phone_number, picture },
//     // thunkAPI
//     // navigate
//     dispatch
//   ) => {
//     try {
//       const response = await fetch("/api/signup", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//           phone_number,
//           picture,
//         }),
//       });
//       let data = await response.json();
//       console.log("data", data);
//       console.log("response", response);

//       return (data) =>
//         dispatch({
//           type: "user/signup/fulfilled",
//           payload: data,
//         });

//       if (response.status >= 200 || response.status < 300) {
//         // navigate("/welcome");
//         return {
//           ...data,
//           username: username,
//           email: email,
//           password: password,
//           phone_number: phone_number,
//           picture: picture,
//         };
//       } else {
//         return thunkAPI.rejectWithValue(data);
//       }
//     } catch (e) {
//       console.log("Error", e.response.data);
//       // navigate("/signup");
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "user/login",
//   async ({ email, password }, thunkAPI, navigate) => {
//     try {
//       const response = await fetch("/api/login", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });
//       let data = await response.json();

//       console.log("data", data);

//       if (response.status >= 200 || response.status < 300) {
//         // navigate("/welcome");
//         return { ...data, email: email };
//       } else {
//         return thunkAPI.rejectWithValue(data);
//       }
//     } catch (e) {
//       console.log("Error", e.response.data);
//     }
//   }
// );

// export const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     username: "",
//     email: "",
//     password: "",
//     phone_number: "",
//     picture: "",
//   },
//   reducers: {
//     signup: (state, action) => {
//       state.user = action.payload;
//     },
//     login: (state, action) => {
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//     },
//   },
// });

// export const { login, logout, signup } = userSlice.actions;

// export const selectUser = (state) => state.user;

// export default userSlice.reducer;

const initialState = {
  username: "",
  email: "",
  password: "",
  phone_number: "",
  picture: "",
};
function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "user/signup/fulfilled":
      return {
        ...state,
        payload,
      };
    default:
      return state;
  }
}
export const selectUser = (state) => state.user;

export default userReducer;
