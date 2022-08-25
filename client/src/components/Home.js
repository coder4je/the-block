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
    <div className="home">
      <div className="title">
        <h1 className="title-letters">C U B E</h1>
        <h2>MANAGE YOUR PROJECT</h2>
      </div>
      <div className="wrapper">
        <div className="cube">
          <div className="one">PROJECT MANAGEMENT</div>
          <div className="two">COMMUNICATION</div>
          <div className="three">REPORT</div>
          <div className="four">SECURITY</div>
          <div className="five">TEAMWORK</div>
          <div className="six">INNOVATION</div>
        </div>
      </div>

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
