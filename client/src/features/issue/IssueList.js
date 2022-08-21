import React from "react";
import IssueDetails from "./IssueDetails";

function IssueList({ issues, taskId }) {
  const issueList = issues.map((issue) => {
    return <IssueDetails key={issue.id} issue={issue} taskID={taskId} />;
  });
  return issueList;
}

export default IssueList;
