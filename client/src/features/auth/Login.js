import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./userSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Login({ currentUser }) {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const response = useSelector((state) => state.user.payload);
  console.log(response);
  console.log(currentUser);

  if (currentUser) {
    navigate("/welcome");
  }

  function handleSignup() {
    navigate("/signup");
  }

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login Here</h1>
        <label className="login-label">Email</label>
        <input
          placeholder="Email"
          {...register(
            "email",
            {
              pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
            },
            { required: true }
          )}
          defaultValue="email"
        />
        <label className="login-label">Password</label>
        <input
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <input type="submit" />
      </form>
      <button onClick={handleSignup}>Create Account</button>
    </div>
  );
}

export default Login;
