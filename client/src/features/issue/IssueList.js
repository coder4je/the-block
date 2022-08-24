import React from "react";
import IssueDetails from "./IssueDetails";

function IssueList({ issues, refresh, setRefresh }) {
  console.log(issues);

  const issueList = issues.map((issue) => {
    return (
      <IssueDetails
        key={issue.id}
        issue={issue}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    );
  });
  return <div className="project-list-container">{issueList}</div>;
}

export default IssueList;
