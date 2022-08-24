import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

function Login({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();

  const onSubmit = (e) => {
    const sendingData = {
      email: e.email,
      password: e.password,
    };
    fetch("/api/login", {
      method: "POST",
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
