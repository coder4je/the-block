import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { createIssue, addIssue } from "./issueReducer";
import IssueList from "./IssueList";
import MemberList from "./MemberList";
import { useNavigate } from "react-router-dom";

function IssueForm() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const [issues, setIssues] = useState([]);
  const [resolved, setResolved] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const now = dayjs();
  const today = dayjs(now).format("MM/DD/YY");

  const currentProject = useSelector((state) => state.projects.payload);
  const currentTask = useSelector((state) => state.tasks.payload);
  const currentDate = useSelector((state) => state.date);
  const taskId = currentTask.id;
  const projectId = currentProject.id;
  console.log(currentDate);
  console.log(taskId);
  console.log(projectId);
  console.log(issues);

  //Get all members
  // const allMembers = [];

  // const allMembers = members.filter((item, index) => {
  //   return members.indexOf(item) === index;
  // });

  // useEffect(() => {
  //   fetch(`/projects/${projectId}`)
  //     .then((res) => res.json())
  //     .then((data) => setAllMembers(data.users));
  // }, []);

  // useEffect(() => {
  //   fetch(`/user_projects`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const filtered = data.filter((item) => item.project_id === projectId);
  //       console.log(filtered);
  //     });
  // }, []);

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(
          data
            .filter((item) => item.projects)
            .filter((project) => console.log(project.id))
        );
      });
  }, []);
  console.log(allMembers);
  // const newMembers = [...new Set(allMembers.map((item) => item))];
  // console.log(newMembers);

  // get Issues
  useEffect(() => {
    fetch(`/issues`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIssues(
          data.filter(
            (item) => item.task_id === taskId && item.issue_date === currentDate
          )
        );
      });
  }, [refresh]);

  const onSubmit = (e) => {
    fetch("/issues", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issue_details: e.issue_details,
        resolved: resolved,
        task_id: taskId,
        issue_date: dayjs(currentDate).format("YYYY-MM-DD"),
      }),
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
    <div className="issue">
      <h1>{currentProject.name}</h1>
      <h2>{currentTask.name}</h2>
      <h3>Today: {today}</h3>
      <div>
        Members
        <div>{allMembers ? <MemberList allMembers={allMembers} /> : null}</div>
      </div>
      <h3>Issues</h3>
      <button onClick={handleAddIssue}>+</button>
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
      {issues ? <IssueList issues={issues} taskID={taskId} /> : null}
      <button className="project-btn" onClick={handleClick}>
        Back To Project Scheduler
      </button>
    </div>
  );
}

export default IssueForm;
