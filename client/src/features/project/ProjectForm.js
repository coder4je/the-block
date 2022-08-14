import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createProject } from "./projectsActions";

function ProjectForm() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onSubmit = (data) => {
    dispatch(createProject(data));
  };

  return (
    <div className="project">
      <form className="project-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Project Form</h1>
        <div>
          <label className="project-form-label">Name</label>
          <input
            className="project-form-name"
            type="text"
            placeholder="Project Name"
            {...register("name")}
          />
          <label className="project-form-label">Description</label>
          <input
            className="project-form-description"
            type="text"
            placeholder="Project Description"
            {...register("description")}
          />
          <div style={{ display: "flex" }}>
            <DatePicker
              placeholderText="Select Start Date"
              selected={startDate}
              selectsStart
              format="MM/dd/yyyy"
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              placeholderText="Select End Date"
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
