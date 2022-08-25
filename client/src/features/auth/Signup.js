import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { signupUser } from "./userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

function Signup({ currentUser, setCurrentUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(true);
  const newUser = useSelector((state) => state.user.payload);
  const { register, handleSubmit, reset } = useForm();
  const [userProjectId, setUserProjectId] = useState([]);

  useEffect(() => {
    fetch("/user_projects")
      .then((res) => res.json())
      .then((data) => {
        setUserProjectId(
          data.filter((item) => item.member_email === currentUser.email)
        );
        console.log(data);
      });
  }, [currentUser]);

  const onSubmit = (e) => {
    const sendingData = {
      username: e.username,
      email: e.email,
      password: e.password,
      phone_number: e.phone_number,
      picture: e.picture,
    };
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendingData),
    })
      .then((r) => r.json())
      .then((user) => setCurrentUser(user));
    reset();

    const data = {
      user_id: currentUser.id,
    };
    console.log(data);
    fetch(`/user_projects/${userProjectId.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  if (currentUser) {
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
          placeholder="Enter Email"
          {...register("email", {
            pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
          })}
        />
        <label className="login-label">Password</label>
        <input
          className="login-input"
          placeholder="Password"
          type="password"
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
          name="picture"
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
