import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signupUser } from "./userSlice";
import { useNavigate } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data, navigate) => {
    dispatch(signupUser(data, navigate));
    // navigate("/welcome");
  };

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
