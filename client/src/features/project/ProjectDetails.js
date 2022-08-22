import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "./projectReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function ProjectDetails({ project }) {
  const { name, description, start_date, end_date } = project;
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick() {
    console.log(project);
    dispatch(addProject(project));
    navigate("/project_report");
  }

  function handleEdit(e) {
    e.stopPropagation();
    navigate("/project_edit");
  }
  function handleRemove(e) {
    e.stopPropagation();
    fetch(`/projects/${project.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        console.log("Deleted");
        setUpdated(true);
        navigate("/project_report");
      }
    });
  }

  return (
    <div className="project-card" onClick={handleClick}>
      <div>
        <strong> Name: {name}</strong>
      </div>
      <div>Description: {description}</div>
      <div>{start_date}</div>
      <div>~</div>
      <div>{end_date}</div>
      <button className="edit-btn" onClick={handleEdit}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <button className="remove-btn" onClick={handleRemove}>
        X
      </button>
    </div>
  );
}

export default ProjectDetails;
