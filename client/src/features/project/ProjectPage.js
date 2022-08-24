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
  const [currentTask, setCurrentTask] = useState([]);

  const currentProject = useSelector((state) => state.projects.payload);

  const { name, description, start_date, end_date } = currentProject;
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const now = dayjs();
  const today = dayjs(now).format("MM/DD/YY");

  console.log(currentProject.id);

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

  const handleClick = () => {
    setShowDate(!showDate);
  };

  // Create Blocks
  const days = [];
  for (let i = 0; i < duration; i++) {
    days.push(dayjs(startDate).add(i, "day").format("MM/DD/YY"));
  }

  const upToday = Math.floor(
    Math.abs(new Date(today) - new Date(currentProject.start_date)) /
      (1000 * 60 * 60 * 24)
  );

  console.log(upToday);

  const listItems = days.map((day, index) => (
    // console.log(dayjs(day).format("DD"))
    <td
      key={Math.random()}
      className={index === upToday ? "table-block-today" : "table-block"}
      style={showDate ? { color: "black" } : { color: "#7fcbd7" }}
      onClick={handleClick}
    >
      {dayjs(day).format("DD")}
    </td>
  ));

  // TASKS

  function handleCreateTask() {
    navigate("/task_form");
  }

  useEffect(() => {
    fetch("/tasks")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTask(
          data.filter((task) => task.project_id === currentProject.id)
        );
      });
  }, []);

  function handleMoveToReport() {
    navigate("/project_report");
  }

  return (
    <>
      <header className="header-container">
        <button
          className="header-btn"
          style={{ width: 150 }}
          onClick={handleMoveToReport}
        >
          Project Report
        </button>
        <div className="project-info">
          <div className="project-name">{name}</div>
          <div>{description}</div>
        </div>
      </header>
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
