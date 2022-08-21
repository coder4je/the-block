import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "./projectReducer";

function ProjectDetails({ project }) {
  const { name, description, start_date, end_date } = project;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick() {
    console.log(project);
    dispatch(addProject(project));
    navigate("/project_report");
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
