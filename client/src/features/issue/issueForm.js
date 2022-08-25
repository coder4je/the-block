import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { createIssue, addIssue } from "./issueReducer";
import IssueList from "./IssueList";
import MemberList from "./MemberList";
import { useNavigate } from "react-router-dom";

function IssueForm({ currentUser }) {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const [issues, setIssues] = useState([]);
  const [resolved, setResolved] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const [currentEmail, setCurrentEmail] = useState([]);

  const now = dayjs();
  const today = dayjs(now).format("MM/DD/YY");

  const currentProject = useSelector((state) => state.projects.payload);
  const currentTask = useSelector((state) => state.tasks.payload);
  const currentDate = useSelector((state) =>
    dayjs(state.date).format("MM/DD/YY")
  );
  const taskId = currentTask.id;
  const projectId = currentProject.id;

  console.log(taskId);
  console.log(currentDate);

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
  }, []);

  // get Issues
  useEffect(() => {
    fetch(`/issues`)
      .then((res) => res.json())
      .then((data) => {
        setIssues(
          data.filter(
            (item) =>
              item.task_id === taskId &&
              item.issue_date === dayjs(currentDate).format("YYYY-MM-DD")
          )
        );
      });
  }, [show]);

  const onSubmit = (e) => {
    const sendingData = {
      issue_details: e.issue_details,
      resolved: resolved,
      task_id: taskId,
      issue_date: dayjs(currentDate).format("YYYY-MM-DD"),
    };
    console.log(sendingData);
    fetch("/issues", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendingData),
    })
      .then((res) => res.json())
      .then((data) => dispatch(addIssue(data)));
    setRefresh(!refresh);
    setShow(!show);
    console.log(refresh);
  };

  function handleAddIssue() {
    setShow(!show);
  }

  function handleClick() {
    navigate("/project_page");
  }

  return (
    <div>
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

      <div>
        <h2>{currentTask.name}</h2>
        <div></div>
        <div>Today: {today}</div>
        <h4>Issue Date: {currentDate}</h4>
      </div>
      <br />
      <div>
        <h2>Members</h2>
        <div>
          {currentEmail ? <MemberList allMembers={currentEmail} /> : null}
        </div>
      </div>
      <div className="issue-container">
        <h3>Issues</h3>
        <button
          className="project-form-btn"
          onClick={handleAddIssue}
          style={{ width: 100 }}
        >
          Add Issue
        </button>
      </div>
      {show ? (
        <form className="issue-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="project-form-label">Issue Details</label>
            <input
              className="project-form-input"
              type="text"
              placeholder="issue"
              {...register("issue_details")}
            />
            <label className="issue-form-label">Resolved</label>
            <input
              className="project-form-checkbox"
              type="checkbox"
              name="resolved"
              onClick={() => setResolved(!resolved)}
              style={{ cursor: "pointer" }}
            />
            <button className="project-form-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      ) : null}
      {issues ? (
        <IssueList issues={issues} refresh={refresh} setRefresh={setRefresh} />
      ) : null}
    </div>
  );
}

export default IssueForm;
