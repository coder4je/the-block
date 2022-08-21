import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../task/taskReducer";

function ProjectReport() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentProject = useSelector((state) => state.projects.payload);

  console.log(currentProject);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  function handleClick() {
    navigate("/project_page");
  }

  return (
    <div>
      {currentProject ? (
        <div>
          <h1>Project: {currentProject.name}</h1>
          <h3>Description: {currentProject.description}</h3>
        </div>
      ) : null}

      <button onClick={handleClick}>Click</button>
    </div>
  );
}

export default ProjectReport;
