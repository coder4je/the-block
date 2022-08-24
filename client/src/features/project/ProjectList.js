import React from "react";
import ProjectDetails from "./ProjectDetails";

function ProjectList({ projects = [], updated, setUpdated }) {
  console.log(projects);
  const projectList = projects.map((project) => (
    <ProjectDetails
      key={Math.random()}
      project={project}
      setUpdated={setUpdated}
      updated={updated}
    />
  ));
  return <div className="project-list-container">{projectList}</div>;
}
export default ProjectList;
