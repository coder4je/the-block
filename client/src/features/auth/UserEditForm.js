import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { signupUser } from "./userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

function UserEditForm({ currentUser, setCurrentUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(true);
  const newUser = useSelector((state) => state.user.payload);
  const { register, handleSubmit } = useForm();

  const onSubmit = (e) => {
    const sendingData = {
      username: e.username,
      email: currentUser.email,
      password: currentUser.password,
      phone_number: e.phone_number,
      picture: e.picture,
    };
    fetch(`/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendingData),
    })
      .then((r) => r.json())
      .then((user) => setCurrentUser(user));
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
          readOnly
          className="login-input"
          placeholder={currentUser.email}
          // {...register("email", {
          //   pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
          // })}
        />
        <label className="login-label">Password</label>
        <input
          readOnly
          className="login-input"
          placeholder={currentUser.password}
          type="password"
          // {...register("password", { required: true })}
        />
        <label className="login-label">Phone Number</label>
        <input
          className="login-input"
          placeholder={currentUser.phone_number}
          {...register("phone_number")}
        />
        <label className="login-label">Picture</label>
        <input
          className="login-input"
          placeholder={currentUser.picture}
          name="picture"
          {...register("picture")}
        />
        <button className="login-btn" type="submit">
          Edit Profile
        </button>
      </form>
    </div>
  );
}

export default UserEditForm;