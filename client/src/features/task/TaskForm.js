import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTask, createTask, getTasks } from "./taskReducer";
import { useNavigate, Navigate } from "react-router-dom";

function TaskForm() {
  const { handleSubmit, register, control } = useForm();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();

  const currentProject = useSelector((state) => state.projects.payload);
  console.log(currentProject);

  const onSubmit = (e) => {
    const sendingData = {
      name: e.name,
      category: e.category,
      completion: complete,
      start_date: startDate,
      end_date: endDate,
      project_id: currentProject.id,
    };
    fetch("/tasks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendingData),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(addTask(data));
      });
    console.log(sendingData);
    navigate("/project_page");
  };

  return (
    <div className="project">
      <form className="project-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>TASK</h1>
        <div>
          <label className="project-form-label">Name</label>
          <input
            className="project-form-input"
            type="text"
            placeholder="Project Name"
            {...register("name")}
          />
          <label className="project-form-label">Category</label>
          <input
            className="project-form-input"
            type="text"
            placeholder="Project category"
            {...register("category")}
          />
          <label className="project-form-label">Completion</label>
          <input
            className="project-form-checkbox"
            type="checkbox"
            name="completion"
            onClick={() => setComplete(!complete)}
            style={{ cursor: "pointer" }}
          />
          <br />
          <Controller
            name="Start Date"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="project-form-dayPicker"
                placeholderText="Select Start Date"
                selected={field.value}
                selectsStart
                format="MM/dd/yyyy"
                onChange={(date) => {
                  setStartDate(date);
                  field.onChange(date);
                }}
                rules={{ required: true }}
              />
            )}
          />
          <Controller
            name="End Date"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="project-form-dayPicker"
                placeholderText="Select End Date"
                selected={field.value}
                selectsEnd
                format="MM/dd/yyyy"
                onChange={(date) => {
                  setEndDate(date);
                  field.onChange(date);
                }}
                rules={{ required: true }}
              />
            )}
          />
          <button className="project-form-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
