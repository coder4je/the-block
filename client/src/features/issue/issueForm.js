import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { createIssue } from "./issueReducer";

function IssueForm({ currentUser }) {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const [resolved, setResolved] = useState(false);

  const currentTask = 1;
  console.log(currentUser.id);

  const onSubmit = (e) => {
    const data = {
      issue_details: e.issue_details,
      resolved: resolved,
      task_id: currentTask,
      user_id: currentUser.id,
    };
    console.log(data);
    dispatch(createIssue(data));
  };

  return (
    <div className="issue">
      <h1>Project</h1>
      <h2>Task</h2>
      <h3>Today</h3>
      <ul>
        Members
        <li></li>
      </ul>
      <h3>Issues</h3>
      <form className="issue-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Task Details</h1>
        <div>
          <label className="issue-form-label">Name</label>
          <input
            className="issue-form-name"
            type="text"
            placeholder="issue"
            {...register("issue")}
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
    </div>
  );
}

export default IssueForm;
