import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { signupUser } from "./userSlice";

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
    return <Navigate to="/welcome" />;
  }

  return (
    <div className="signup">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Signup Here</h1>
        <label className="signup-label">Name</label>
        <input placeholder="username" {...register("username")} />
        <br />
        <label className="signup-label">Email</label>
        <input
          {...register("email", {
            pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
          })}
          defaultValue="email"
        />
        <label className="password-label">Password</label>
        <input
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <label className="signup-label">Phone Number</label>
        <input placeholder="Phone Number" {...register("phone_number")} />
        <label className="signup-label">Picture</label>
        <input placeholder="Img URL" {...register("picture")} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Signup;
