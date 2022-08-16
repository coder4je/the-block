import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveProjects } from "../features/project/projectReducer";
import ProjectList from "../features/project/ProjectList";
import { useNavigate } from "react-router-dom";

function Welcome({ currentUser }) {
  const projects = useSelector((state) => state.projects.map((item) => item));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get Projects
  useEffect(() => {
    dispatch(retrieveProjects());
  }, [dispatch]);

  function handleCreateProject() {
    navigate("/project");
  }

  return (
    <div>
      {currentUser ? (
        <div>
          <h1>My Page</h1>
          <h2>Welcome {currentUser.username}</h2>
          <h3>My Info:</h3>
          <ul>
            <img src={currentUser.picture} alt="my profile picture" />
            <li>Email: {currentUser.email}</li>
            <li>Phone Number: {currentUser.phone_number}</li>
          </ul>
        </div>
      ) : null}
      <button onClick={handleCreateProject}>Create Project</button>
      <div className="projects">
        <h1>Project List</h1>
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}

export default Welcome;
