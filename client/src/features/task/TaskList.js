import React, { useEffect } from "react";
import dayjs from "dayjs";
import TaskDetails from "./TaskDetails";
import { useSelector, useDispatch } from "react-redux";

function TaskList({ currentTask }) {
  console.log(currentTask);
  // const taskCard = currentTask.map((task) => (
  //   <TaskDetails key={task.id} task={task} />
  // ));

  const taskCard = "hi";

  return <tr>{taskCard}</tr>;
}

export default TaskList;
