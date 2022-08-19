import React, { useEffect } from "react";
import ProjectList from "../features/project/ProjectList";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authUser } from "../features/auth/userSlice";

function Welcome({ currentUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleCreateProject() {
    navigate("/project");
  }
  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  const projects = useSelector((state) => state.user.payload.projects);

  console.log(projects);

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
        {projects ? <ProjectList projects={projects} /> : null}
      </div>
    </div>
  );
}

export default Welcome;
