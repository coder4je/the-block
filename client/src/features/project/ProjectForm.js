import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FieldDatePicker } from "../../components/FieldDatePicker";

function ProjectForm() {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
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
          <label className="project-form-label">Start Date</label>
          <FieldDatePicker
            // component={FieldDatePicker}
            className="project-form-start-date"
            name="date_till"
            placeholder="YYYY/MM/DD"
            {...register("name")}
          />
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
