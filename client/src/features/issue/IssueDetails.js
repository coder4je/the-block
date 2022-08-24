import React from "react";
import { addIssue } from "./issueReducer";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

function IssueDetails({ issue, refresh, setRefresh }) {
  const dispatch = useDispatch();

  const handleRemove = (e) => {
    e.stopPropagation();
    fetch(`/issues/${issue.id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setRefresh(!refresh);
        dispatch(addIssue(null));
      }
    });
  };

  console.log(issue);

  const { issue_details } = issue;
  return (
    <div className="project-card">
      {issue_details}
      <button onClick={handleRemove}>X</button>
    </div>
  );
}

export default IssueDetails;
