import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProjectPage from "./ProjectPage";
import { addProject } from "./projectReducer";

function ProjectDetails({ project }) {
  const { id, name, description, start_date, end_date } = project;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const projectList = useSelector((state) =>
  //   console.log(state.projects.payload)
  // );

  function handleClick() {
    console.log(project);
    dispatch(addProject(project));
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
