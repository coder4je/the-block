import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "./projectReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

function ProjectDetails({ project, setUpdated, updated }) {
  const { name, description, start_date, end_date } = project;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick() {
    console.log(project);
    dispatch(addProject(project));
    navigate("/project_report");
  }

  function handleEdit(e) {
    e.stopPropagation();
    dispatch(addProject(project));
    navigate("/project_edit");
  }
  function handleRemove(e) {
    e.stopPropagation();
    fetch(`/projects/${project.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        console.log("Deleted");
        dispatch(addProject(null));
        setUpdated(!updated);
        alert("Deleted");
      }
    });
  }

  return (
    <div className="project-card" onClick={handleClick}>
      <div>
        <strong> Name: {name}</strong>
      </div>
      <div>Description: {description}</div>
      <div>{start_date} ~</div>
      <div>{end_date}</div>
      <button className="edit-btn" onClick={handleEdit}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <button className="remove-btn" onClick={handleRemove}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
}

export default ProjectDetails;
