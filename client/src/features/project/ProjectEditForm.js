import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { createProject } from "./projectReducer";
import MemberForm from "./MemberForm";
import MemberList from "../issue/MemberList";
import { addMembers } from "./memberReducer";
import { useDispatch, useSelector } from "react-redux";
import ProjectReport from "./ProjectReport";
import { addProject } from "./projectReducer";
import { useNavigate } from "react-router-dom";

function ProjectForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register, control } = useForm();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [updatedProject, setUpdatedProject] = useState([]);

  const currentProject = useSelector((state) => state.projects.payload);

  console.log(currentProject);

  const onSubmit = (e) => {
    const sendingData = {
      name: e.name,
      description: e.description,
      start_date: startDate,
      end_date: endDate,
    };
    fetch(`/projects/${currentProject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendingData),
    })
      .then((res) => res.json())
      .then((data) => dispatch(addProject(data)));
    navigate("/project_report");
  };

  return (
    <div className="project">
      <form className="project-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="project-name">EDIT PROJECT</h1>
        <div>
          <label className="project-form-label">Name</label>
          <input
            className="project-form-input"
            type="text"
            placeholder={currentProject.name}
            {...register("name")}
          />
          <label className="project-form-label">Description</label>
          <input
            className="project-form-input"
            type="text"
            placeholder={currentProject.description}
            {...register("description")}
          />
          <label className="project-form-label">Start Date</label>
          <Controller
            name="Start Date"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="project-form-dayPicker"
                placeholderText={currentProject.start_date}
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
                placeholderText={currentProject.end_date}
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
            Edit
          </button>
        </div>
      </form>
      {/* {updatedProject ? <ProjectReport updatedProject={updatedProject}/> : null } */}
    </div>
  );
}

export default ProjectForm;
