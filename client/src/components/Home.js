import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const myMesh = useRef();

  function handleLogin() {
    navigate("/login");
  }

  function handleSignup() {
    navigate("/signup");
  }
  return (
    <div>
      <h1>Hi</h1>
      <div className="home-btn">
        <button className="project-btn" onClick={handleLogin}>
          Login
        </button>
        <button className="project-btn" onClick={handleSignup}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Home;
