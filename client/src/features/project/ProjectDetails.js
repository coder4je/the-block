import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProjectPage from "./ProjectPage";

function ProjectDetails({ project }) {
  const { id, name, description, start_date, end_date } = project;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick() {
    console.log(id);
    dispatch({ type: "projects/selectedProject", payload: id });
    navigate("/project_page");
  }
  return (
    <div className="project-card" onClick={handleClick}>
      <ul>
        <li>Project: {name}</li>
        <li>Description: {description}</li>
        <li>Start Date: {start_date}</li>
        <li>End Date: {end_date}</li>
      </ul>
    </div>
  );
}

export default ProjectDetails;
