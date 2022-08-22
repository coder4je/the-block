import React, { useEffect, useState } from "react";
import ProjectList from "../features/project/ProjectList";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authUser } from "../features/auth/userSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { addProject } from "../features/project/projectReducer";

function Welcome({ currentUser }) {
  const [getNewProjects, setGetNewProjects] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleCreateProject() {
    navigate("/project");
  }
  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  const projects = useSelector((state) => state.user.payload.projects);

  function setUpdated(e) {
    setGetNewProjects(e);
    dispatch(addProject(e));
  }

  return (
    <div className="welcome-container">
      {currentUser ? (
        <Card sx={{ maxWidth: 345 }} className="member-container">
          <CardMedia component="img" height="200" image={currentUser.picture} />
          <CardContent>
            <h2>{currentUser.username}</h2>
          </CardContent>
        </Card>
      ) : null}
      <br />
      <button className="project-btn" onClick={handleCreateProject}>
        Create Project
      </button>
      <div className="projects">
        <h1>PROJECTS</h1>
        {projects ? (
          <ProjectList projects={projects} setUpdated={setUpdated} />
        ) : null}
      </div>
    </div>
  );
}

export default Welcome;
