import React from "react";
import ProjectDetails from "./ProjectDetails";

function ProjectList({ projects = [] }) {
  const projectList = projects.map((project) => (
    <ProjectDetails key={project.id} project={project} />
  ));
  return <div className="project-container">{projectList}</div>;
}
export default ProjectList;
