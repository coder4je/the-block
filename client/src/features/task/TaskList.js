import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function TaskList({ currentTask }) {
  const dayjs = require("dayjs");
  const { name, completion, start_date, end_date, category } = currentTask;

  const taskStartDate = new Date(start_date);
  const taskEndDate = new Date(end_date);

  const taskDuration = Math.floor(
    Math.abs(new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)
  );

  const handleClick = () => {
    console.log("hi");
  };
  console.log(taskDuration);

  // Create Blocks
  const taskDays = [];
  for (let i = 0; i < taskDuration; i++) {
    taskDays.push(dayjs(taskStartDate).add(i, "day").format("ddd"));
  }
  const taskList = taskDays.map((day) => (
    <td key={Math.random()} className="table-block" onClick={handleClick}>
      ""
    </td>
  ));

  return (
    <tr>
      <th className="table-first-column">{name}</th>
      {taskList}
    </tr>
  );
}

export default TaskList;
