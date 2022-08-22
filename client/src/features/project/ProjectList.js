import React from "react";
import ProjectDetails from "./ProjectDetails";

function ProjectList({ projects = [] }) {
  console.log(projects);
  const projectList = projects.map((project) => (
    <ProjectDetails key={Math.random()} project={project} />
  ));
  return <div className="project-list-container">{projectList}</div>;
}
export default ProjectList;
