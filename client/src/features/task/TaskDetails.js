import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedTask } from "./taskReducer";
import { addDate } from "../issue/dateReducer";

function TaskList({ task }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dayjs = require("dayjs");
  const { name, completion, start_date, end_date, category } = task;

  const taskStartDate = new Date(start_date);
  const taskEndDate = new Date(end_date);

  const taskDuration = Math.floor(
    Math.abs(new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)
  );

  const handleClick = (e) => {
    const currentDate = dayjs(e.target.attributes.value.nodeValue).format(
      "YYYY-MM-DD"
    );
    dispatch(addDate(currentDate));
    dispatch(selectedTask(task));
    navigate("/issue_form");
  };

  // Create Blocks
  const taskDays = [];
  for (let i = 0; i < taskDuration; i++) {
    taskDays.push(dayjs(taskStartDate).add(i, "day").format("MM/DD/YY"));
  }
  const taskList = taskDays.map((day) => (
    <td
      key={Math.random()}
      className="table-block"
      value={day}
      onClick={handleClick}
    >
      {dayjs(day).format("DD")}
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
