import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedTask } from "./taskReducer";
import { addDate } from "../issue/dateReducer";
import { addTask, createTask, getTasks } from "./taskReducer";
import { updateProject } from "../project/projectReducer";

function TaskList({ task }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [issueDates, setIssueDates] = useState([]);
  const dayjs = require("dayjs");
  const { name, completion, start_date, end_date, category } = task;
  const currentProject = useSelector((state) => state.projects.payload);

  const taskStartDate = new Date(start_date);
  const taskEndDate = new Date(end_date);

  const upToStartDate = Math.floor(
    Math.abs(new Date(start_date) - new Date(currentProject.start_date)) /
      (1000 * 60 * 60 * 24)
  );

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

  // get Issues
  useEffect(() => {
    fetch(`/issues`)
      .then((res) => res.json())
      .then((data) => {
        setIssueDates(
          data
            .filter((item) => item.task_id === task.id)
            .filter((item) => item.resolved === false)
            .map((item) => dayjs(item.issue_date).format("MM/DD/YY"))
        );
      });
  }, []);

  // Create Blocks
  const taskDays = [];
  for (let i = 0; i < taskDuration; i++) {
    taskDays.push(
      dayjs(start_date + upToStartDate)
        .add(i, "day")
        .format("MM/DD/YY")
    );
  }

  const taskBlankDays = [];

  for (let i = 0; i < upToStartDate; i++) {
    taskBlankDays.push(
      dayjs(currentProject.start_date).add(i, "day").format("MM/DD/YY")
    );
  }

  const totalDays = taskBlankDays.concat(taskDays);

  const taskList = totalDays.map((day) => {
    return (
      <td
        style={
          issueDates.find((date) => date === day)
            ? { backgroundColor: "red", color: "red" }
            : null
        }
        key={Math.random()}
        className={
          taskBlankDays.find((date) => date === day)
            ? "table-block-blank"
            : "table-block"
        }
        value={day}
        onClick={handleClick}
      >
        {dayjs(day).format("DD")}
      </td>
    );
  });

  function handleEdit() {
    dispatch(addTask(task));
    navigate("/task_edit_form");
  }

  return (
    <tr
      className="task-row"
      style={
        task.completion === true
          ? { backgroundColor: "gray", color: "gray" }
          : null
      }
    >
      <th className="table-first-column" onClick={handleEdit}>
        {name}
      </th>
      {taskList}
    </tr>
  );
}

export default TaskList;
