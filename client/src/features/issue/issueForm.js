import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { createIssue, addIssue } from "./issueReducer";
import IssueList from "./IssueList";
import MemberList from "./MemberList";

function IssueForm({ currentUser }) {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [issues, setIssues] = useState([]);
  const [resolved, setResolved] = useState(false);
  const [allMembers, setAllMembers] = useState([]);
  const now = dayjs();
  const today = dayjs(now).format("MM/DD/YY");

  const currentProject = useSelector((state) => state.projects.payload);
  const currentTask = useSelector((state) => state.tasks.payload);
  const taskId = currentTask.id;
  const projectId = currentProject.id;
  console.log(taskId);
  console.log(projectId);

  //Get all members
  // const allMembers = [];
  useEffect(() => {
    fetch(`/projects/${projectId}`)
      .then((res) => res.json())
      .then((data) => setAllMembers(data.users));
  }, []);

  console.log(allMembers);

  // get Issues
  useEffect(() => {
    fetch(`/issues`)
      .then((res) => res.json())
      .then((data) => {
        setIssues(data.filter((item) => item.task_id === taskId));
      });
  }, []);

  const onSubmit = (e) => {
    // const data = {
    //   issue_details: e.issue_details,
    //   resolved: resolved,
    //   task_id: taskId,
    // };
    // console.log(data);
    // dispatch(createIssue(data));
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
      }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(addIssue(data)));
  };

  function handleAddIssue() {
    setShow(!show);
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
            <label className="issue-form-label">Issue Details</label>
            <input
              className="issue-form-name"
              type="text"
              placeholder="issue"
              {...register("issue_details")}
            />
            <label className="issue-form-label">Resolved</label>
            <input
              className="issue-form-completion"
              type="checkbox"
              name="resolved"
              onClick={() => setResolved(!resolved)}
              style={{ cursor: "pointer" }}
            />
            <input type="submit" />
          </div>
        </form>
      ) : null}
      {issues ? <IssueList issues={issues} taskID={taskId} /> : null}
    </div>
  );
}

export default IssueForm;
