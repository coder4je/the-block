import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addProject, createProject } from "./projectReducer";
import { useNavigate } from "react-router-dom";
import MemberForm from "./MemberForm";
import MemberList from "../issue/MemberList";
import { addMembers } from "./memberReducer";

function ProjectForm({ currentUser, setCurrentProject }) {
  const { handleSubmit, register, control } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const onSubmit = (e) => {
    e.stopPropagation();
    const sendingData = {
      name: e.name,
      description: e.description,
      start_date: startDate,
      end_date: endDate,
    };
    fetch("/projects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendingData),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentProject(data);
        dispatch(addProject(data));
      });
    navigate("/project_report");
  };

  return (
    <div className="project-container">
      <div className="project">
        <form className="project-form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="project-name">NEW PROJECT</h1>

          <div>
            <label className="project-form-label">Name</label>
            <input
              className="project-form-input"
              type="text"
              placeholder="Project Name"
              {...register("name")}
            />
            <label className="project-form-label">Description</label>
            <input
              className="project-form-input"
              type="text"
              placeholder="Project Description"
              {...register("description")}
            />
            <label className="project-form-label">Start Date</label>

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
            <label className="project-form-label">End Date</label>

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
    </div>
  );
}

export default ProjectForm;
