import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function ProjectPage() {
  const dayjs = require("dayjs");

  const currentProject = useSelector((state) =>
    state.projects.map((item) => item)
  )[0];

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

  const monthList = full_dates.filter(unique).map((item) => (
    <td key={Math.random()} className="table-months">
      {dayjs(item).format("DD") === "01" ? dayjs(item).format("MMM") : null}
    </td>
  ));

  // console.log(dayjs(startDate).add(1, "day").format("DD"));
  // console.log(dayjs(startDate).format("dddd"));
  // console.log(dayjs(startDate).format("MMM"));

  const handleClick = () => {
    console.log("hi");
  };

  // Create Blocks
  const days = [];
  for (let i = 0; i < duration; i++) {
    days.push(dayjs(startDate).add(i, "day").format("ddd"));
  }
  const listItems = days.map((day) => (
    <td key={Math.random()} className="table-block" onClick={handleClick}>
      {/* {day === "Mon" ? "M" : null} */}
      ""
    </td>
  ));

  // TASKS

  // const currentTask = useSelector((state) => state.tasks.map((item) => item));
  // console.log(currentTask);

  return (
    <>
      <h1>Project: {name}</h1>
      <h3>Description: {description}</h3>
      <table>
        <tbody>
          <tr>{monthList}</tr>
          <tr>
            <th>Task</th>

            {listItems}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ProjectPage;
