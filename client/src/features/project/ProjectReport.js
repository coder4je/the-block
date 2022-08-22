import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../task/taskReducer";
import { createMember } from "../project/memberReducer";
import ProgressBar from "@ramonak/react-progress-bar";

function ProjectReport({ currentUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentProject = useSelector((state) => state.projects.payload);
  const currentMembers = useSelector((state) => state.member);

  console.log(currentProject);
  console.log(currentMembers);
  console.log(currentUser);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  function handleClick() {
    dispatch(
      createMember({
        project_id: currentProject.id,
        user_id: currentUser.id,
        member_email: currentMembers,
      })
    );
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
      <ProgressBar completed={60} />
      <button onClick={handleClick}>Back To Project Scheduler</button>
    </div>
  );
}

export default ProjectReport;
