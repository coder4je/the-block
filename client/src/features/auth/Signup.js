import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { signupUser } from "./userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate(true);
  const newUser = useSelector((state) => state.user.payload);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(signupUser(data));
  };

  const response = useSelector((state) => state.user.payload);
  console.log(response);

  if (response) {
    navigate("/welcome");
  }

  return (
    <div className="signup">
      <div className="logo">
        <FontAwesomeIcon icon={faCube} />
      </div>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Cube</h1>
        <label className="login-label">Name</label>
        <input
          className="login-input"
          placeholder="username"
          {...register("username")}
        />
        <label className="login-label">Email</label>
        <input
          className="login-input"
          {...register("email", {
            pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
          })}
          defaultValue="email"
        />
        <label className="login-label">Password</label>
        <input
          className="login-input"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <label className="login-label">Phone Number</label>
        <input
          className="login-input"
          placeholder="Phone Number"
          {...register("phone_number")}
        />
        <label className="login-label">Picture</label>
        <input
          className="login-input"
          placeholder="Img URL"
          {...register("picture")}
        />
        <button className="login-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;
