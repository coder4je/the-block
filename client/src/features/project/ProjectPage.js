import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import TaskList from "../task/TaskList";
import { useNavigate, Navigate } from "react-router-dom";
import { getTasks, addTask } from "../task/taskReducer";

function ProjectPage() {
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDate, setShowDate] = useState(false);

  const currentProject = useSelector((state) => state.projects.payload);

  const { name, description, start_date, end_date } = currentProject;
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  const duration = Math.floor(
    Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)
  );

  const full_dates = [];
  for (let i = 0; i < duration; i++) {
    full_dates.push(dayjs(startDate).add(i, "day"));
  }

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const yearList = full_dates.filter(unique).map((item) => (
    <td key={Math.random()} className="table-years">
      {dayjs(item).format("MMM") === "Jan" && dayjs(item).format("DD") === "01"
        ? dayjs(item).format("YY")
        : null}
    </td>
  ));

  const monthList = full_dates.filter(unique).map((item) => (
    <td key={Math.random()} className="table-months">
      {dayjs(item).format("DD") === "01" ? dayjs(item).format("MMM") : null}
    </td>
  ));

  // console.log(dayjs(startDate).add(1, "day").format("DD"));
  // console.log(dayjs(startDate).format("dddd"));
  // console.log(dayjs(startDate).format("MMM"));

  const handleClick = () => {
    setShowDate(!showDate);
  };

  // Create Blocks
  const days = [];
  for (let i = 0; i < duration; i++) {
    days.push(dayjs(startDate).add(i, "day").format("MM/DD/YY"));
  }
  const listItems = days.map((day) => (
    // console.log(dayjs(day).format("DD"))
    <td
      key={Math.random()}
      className="table-block"
      style={showDate ? { color: "black" } : { color: "#7fcbd7" }}
      onClick={handleClick}
    >
      {dayjs(day).format("DD")}
    </td>
  ));

  // TASKS

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const currentTask = useSelector((state) => {
    if (state.tasks.payload.length <= 1) {
      return setOpenTaskForm(!openTaskForm);
    } else {
      return state.tasks.payload;
    }
  });

  function handleCreateTask() {
    navigate("/task_form");
  }

  return (
    <>
      <h1>Project: {name}</h1>
      <h3>Description: {description}</h3>
      <table>
        <tbody>
          <tr>
            <th>{dayjs(startDate).format("YYYY")}</th>
            {yearList}
          </tr>
          <tr>
            <th></th>
            {monthList}
          </tr>
          <tr>
            <th>TASK</th>
            {listItems}
          </tr>
          {currentTask ? (
            <TaskList
              currentProject={currentProject}
              currentTask={currentTask}
            />
          ) : null}
          <tr>
            <th>
              <button onClick={handleCreateTask}>+</button>
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ProjectPage;
