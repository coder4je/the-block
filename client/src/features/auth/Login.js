import React from "react";
import { useDispatch } from "react-redux";
// import { loginUser } from "./userSlice";
import { useForm } from "react-hook-form";

function Login() {
  const { handleSubmit, register } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // dispatch(loginUser(data));
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login Here</h1>
        <label className="login-label">Email</label>
        <input
          placeholder="Email"
          {...register("email", {
            pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
          })}
          defaultValue="email"
        />
        <label className="login-label">Password</label>
        <input
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Login;
