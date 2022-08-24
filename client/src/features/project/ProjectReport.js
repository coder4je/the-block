import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMember } from "../project/memberReducer";
import ProgressBar from "@ramonak/react-progress-bar";
import "reactjs-popup/dist/index.css";
import dayjs from "dayjs";
import MemberForm from "./MemberForm";
import MemberList from "../issue/MemberList";

function ProjectReport({ currentUser }) {
  const [showForm, setShowForm] = useState(false);
  const [update, setUpdate] = useState([]);
  const [currentEmail, setCurrentEmail] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const now = dayjs();

  const currentMembers = useSelector((state) => state.member);
  const currentProject = useSelector((state) => state.projects.payload);

  const projectDuration = Math.floor(
    Math.abs(
      new Date(currentProject.end_date) - new Date(currentProject.start_date)
    ) /
      (1000 * 60 * 60 * 24)
  );
  const today = dayjs(now).format("YYYY-MM-DD");

  const projectProgress = Math.floor(
    Math.abs(new Date(today) - new Date(currentProject.start_date)) /
      (1000 * 60 * 60 * 24)
  );

  function handleClick() {
    navigate("/project_page");
  }

  // Get Emails

  useEffect(() => {
    fetch("/user_projects")
      .then((res) => res.json())
      .then((data) =>
        setCurrentEmail(
          data.filter(
            (user) =>
              user.member_email !== null &&
              user.project_id === currentProject.id &&
              user.user_id === currentUser.id
          )
        )
      );
  }, [showForm]);

  useEffect(() => {
    fetch("/user_projects")
      .then((res) => res.json())
      .then((data) =>
        setCurrentEmail(
          data.filter(
            (user) =>
              user.member_email !== null &&
              user.project_id === currentProject.id &&
              user.user_id === currentUser.id
          )
        )
      );
  }, [update]);

  function handleAddMember(e) {
    setShowForm(!showForm);
  }

  return (
    <div className="report">
      <header className="header-container">
        <button
          className="header-btn"
          style={{ width: 150 }}
          onClick={handleClick}
        >
          Project Scheduler
        </button>
        <div className="project-info">
          <div className="project-name">{currentProject.name}</div>
          <div>{currentProject.description}</div>
        </div>
      </header>
      <div className="report-container">
        <div className="report-item">
          <h3>Progress</h3>
          <ProgressBar completed={projectProgress} />
        </div>
      </div>

      <div className="member-form-container">
        <button className="project-btn" onClick={handleAddMember}>
          Add Member
        </button>
        {showForm ? (
          <MemberForm
            currentUser={currentUser}
            currentProject={currentProject}
            setShowForm={setShowForm}
            showForm={showForm}
          />
        ) : null}
      </div>
      <div className="team-member">
        <MemberList
          allMembers={currentEmail}
          currentUser={currentUser}
          update={update}
          setUpdate={setUpdate}
        />
      </div>
    </div>
  );
}

export default ProjectReport;
