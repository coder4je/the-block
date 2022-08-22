import React, { useEffect, useState } from "react";
import { getIssues } from "./issueReducer";
import { useDispatch, useSelector } from "react-redux";

function IssueDetails({ issue, taskId }) {
  // const [members, setMembers] = useState([]);
  // const dispatch = useDispatch();
  // const currentIssue = useSelector((state) => state.issues.payload);
  // const issueId = currentIssue.id;

  // useEffect(() => {
  //   fetch(`/issues/${issueId}`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  console.log(issue);

  const { issue_details } = issue;
  return <div className="issue-details">{issue_details}</div>;
}

export default IssueDetails;
