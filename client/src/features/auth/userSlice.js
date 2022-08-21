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
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          dispatch({
            type: "user/signup/fulfilled",
            payload: data,
          });
        });
      } else {
        console.log("Failed");
      }
    });
  };
}

export function loginUser({ email, password }) {
  return function (dispatch) {
    dispatch({ type: "user/login/pending" });
    fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          dispatch({
            type: "user/login/fulfilled",
            payload: data,
          });
        });
      } else {
        console.log("Failed");
      }
    });
  };
}

export function authUser() {
  return function (dispatch) {
    dispatch({ type: "user/auth/pending" });
    fetch("/api/authorized_user")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "user/auth/fulfilled",
          payload: data,
        });
      });
  };
}

export function signOutUser() {
  return function (dispatch) {
    fetch("/api/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        dispatch({
          type: "user/signOutUser",
          payload: null,
        });
        window.location.href = `/`;
      }
    });
  };
}

const initialState = [];
function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "user/signup/fulfilled":
      return {
        ...state,
        payload,
      };
    case "user/login/fulfilled":
      return {
        ...state,
        payload,
      };
    case "user/signup/failed":
      return {
        ...state,
        payload,
      };
    case "user/signOutUser":
      return { ...state };

    case "user/auth/fulfilled":
      return {
        ...state,
        payload,
      };
    default:
      return state;
  }
}

export default userReducer;
