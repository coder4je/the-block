import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import Welcome from "./components/Welcome";
import ProjectForm from "./features/project/ProjectForm";
import Home from "./components/Home";

function App() {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/project" element={<ProjectForm />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;
