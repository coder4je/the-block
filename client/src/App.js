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
import { useDispatch } from "react-redux";
import TaskForm from "./features/task/TaskForm";
import IssueForm from "./features/issue/IssueForm";
import ProjectReport from "./features/project/ProjectReport";
import MemberList from "./features/issue/MemberList";
import MemberDetails from "./features/issue/MemberDetails";
import ProjectEditForm from "./features/project/ProjectEditForm";
import ProjectDetails from "./features/project/ProjectDetails";
import MemberForm from "./features/project/MemberForm";
import TaskEditForm from "./features/task/TaskEditForm";
import UserEditForm from "./features/auth/UserEditForm";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentProject, setCurrentProject] = useState([]);
  const dispatch = useDispatch();
  console.log(currentUser);
  console.log(currentProject);

  useEffect(() => {
    fetch("/api/authorized_user").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

  function updateUser(input) {
    setCurrentUser(input);
  }
  return (
    <>
      <Nav currentUser={currentUser} updateUser={updateUser} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <Signup currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/login"
          element={
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/user_edit_form"
          element={
            <UserEditForm
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/project"
          element={
            <ProjectForm
              currentUser={currentUser}
              setCurrentProject={setCurrentProject}
            />
          }
        />
        <Route path="/project_edit" element={<ProjectEditForm />} />

        <Route path="/project_page" element={<ProjectPage />} />
        <Route path="/project_details" element={<ProjectDetails />} />
        <Route path="/task_form" element={<TaskForm />} />
        <Route path="/task_edit_form" element={<TaskEditForm />} />
        <Route
          path="/issue_form"
          element={
            <IssueForm
              currentUser={currentUser}
              currentProject={currentProject}
            />
          }
        />
        <Route
          path="/project_report"
          element={
            <ProjectReport
              currentUser={currentUser}
              currentProject={currentProject}
            />
          }
        />

        <Route
          path="/welcome"
          element={<Welcome currentUser={currentUser} />}
        />
        <Route path="/member_list" element={<MemberList />} />
        <Route path="/member_form" element={<MemberForm />} />
        <Route
          path="/member_details"
          element={<MemberDetails setCurrentProject={setCurrentProject} />}
        />
      </Routes>
    </>
  );
}

export default App;
