import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveProjects } from "../features/project/projectReducer";

function Welcome() {
  const projects = useSelector((state) =>
    state.projects.map((item) => item.id === 41)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveProjects());
  }, [dispatch]);

  console.log(projects);
  return <div>projects: {projects}</div>;
}

export default Welcome;
