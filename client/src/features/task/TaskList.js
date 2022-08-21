import TaskDetails from "./TaskDetails";
import React, { useEffect, useState } from "react";

function TaskList({ currentProject }) {
  const [currentTask, setCurrentTask] = useState([]);
  useEffect(() => {
    fetch("/tasks")
      .then((res) => res.json())
      .then((data) => setCurrentTask(data));
  }, []);

  const taskCard = currentTask
    .filter((item) => item.project_id === currentProject.id)
    .map((task) => <TaskDetails key={task.id} task={task} />);

  return taskCard;
}

export default TaskList;
