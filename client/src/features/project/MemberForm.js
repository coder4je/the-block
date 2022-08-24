import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addMembers } from "./memberReducer";
import { useDispatch, useSelector } from "react-redux";

function MemberForm({ currentUser, setShowForm, showForm, currentProject }) {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();

  console.log(currentProject);

  const onSubmit = (e) => {
    const sendingData = {
      member_email: e.email,
      user_id: currentUser.id,
      project_id: currentProject.id,
    };
    console.log(sendingData);
    fetch("/user_projects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendingData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(addMembers(data));
        setShowForm(!showForm);
      });
  };

  return (
    <form className="member-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="project-form-input"
        style={{ margin: 10 }}
        type="text"
        placeholder="enter email"
        {...register("email")}
      />
      <button
        className="project-form-btn"
        type="submit"
        style={{ width: 200, margin: "auto" }}
      >
        Submit
      </button>
    </form>
  );
}

export default MemberForm;
