import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import Welcome from "./components/Welcome";
import ProjectForm from "./features/project/ProjectForm";
import Home from "./components/Home";
import ProjectPage from "./features/project/ProjectPage";
import { useSelector } from "react-redux";
import TaskForm from "./features/task/TaskForm";

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  console.log(currentUser);

  const loggedInUser = useSelector((state) => state.user.payload);
  useEffect(() => {
    setCurrentUser(loggedInUser);
  }, [loggedInUser]);

  function updateUser(input) {
    setCurrentUser(input);
  }

  return (
    <div className="app">
      <Nav currentUser={currentUser} updateUser={updateUser} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login currentUser={currentUser} />} />
        <Route path="/project" element={<ProjectForm />} />
        <Route path="/project_page" element={<ProjectPage />} />
        <Route path="/task_form" element={<TaskForm />} />
        <Route
          path="/welcome"
          element={<Welcome currentUser={currentUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
