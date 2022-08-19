import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createProject } from "./projectReducer";
import { useNavigate } from "react-router-dom";

function ProjectForm() {
  const { handleSubmit, register, control } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onSubmit = (e) => {
    const sendingData = {
      name: e.name,
      description: e.description,
      start_date: startDate,
      end_date: endDate,
    };
    console.log(sendingData);
    dispatch(createProject(sendingData));
    navigate("/welcome");
  };

  // const response = useSelector((state) => state.projects.payload);
  // if (response) {
  // }

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
          <Controller
            name="Start Date"
            control={control}
            render={({ field }) => (
              <DatePicker
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
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
