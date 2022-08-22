import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./userSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

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
      <div className="logo">
        <FontAwesomeIcon icon={faCube} />
      </div>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login-name">CUBE</h1>
        <label className="login-label">EMAIL</label>

        <input
          className="login-input"
          placeholder="Enter Email"
          {...register(
            "email",
            {
              pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
            },
            { required: true }
          )}
          defaultValue="email"
        />
        <label className="login-label">PASSWORD</label>

        <input
          className="login-input"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
      <button className="signup-btn" onClick={handleSignup}>
        Create Account
      </button>
    </div>
  );
}

export default Login;
