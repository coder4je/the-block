import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/login");
  }

  function handleSignup() {
    navigate("/signup");
  }
  return (
    <div>
      <h1>Preview Display</h1>
      <div>3D</div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Create Account</button>
    </div>
  );
}

export default Home;
