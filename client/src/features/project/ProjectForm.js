import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createProject } from "./projectReducer";
import { useNavigate } from "react-router-dom";
import { addTask } from "../task/taskReducer";
import MemberForm from "./MemberForm";
import MemberList from "../issue/MemberList";
import { addMembers } from "./memberReducer";

function ProjectForm({ currentUser }) {
  const { handleSubmit, register, control } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [memberEmail, setMemberEmail] = useState([]);
  const [currentEmail, setCurrentEmail] = useState([]);
  const [userInData, setUserInData] = useState([]);
  const [newUsers, setNewUser] = useState([]);

  // Get all users
  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        data
          .filter((user) => user.email !== currentUser.email)
          .filter((item) => {
            if (item.email === currentEmail) {
              setUserInData([item]);
            } else {
              setNewUser([currentEmail]);
            }
          });
      });
  }, [showForm]);

  // Get All emails
  useEffect(() => {
    fetch("/user_projects")
      .then((res) => res.json())
      .then((data) => setMemberEmail(data.filter((item) => item.member_email)));
  }, [currentEmail]);

  console.log(memberEmail);
  console.log(userInData);
  console.log(newUsers);

  const onSubmit = (e) => {
    const sendingData = {
      name: e.name,
      description: e.description,
      start_date: startDate,
      end_date: endDate,
    };
    console.log(sendingData);
    dispatch(createProject(sendingData));
    dispatch(addMembers(currentEmail));
    navigate("/project_report");
  };

  const handleMemberSubmit = (e) => {
    const member = {
      email: e.email,
    };
    console.log(e.target.value);
    console.log(member);
  };

  const handleAddMember = () => {
    setShowForm(!showForm);
  };

  return (
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
          <button
            className="project-form-addMember-btn"
            onClick={handleAddMember}
          >
            Add Member
          </button>
          {showForm ? (
            <MemberForm
              setCurrentEmail={setCurrentEmail}
              setShowForm={setShowForm}
              currentEmail={currentEmail}
            />
          ) : null}

          <div>
            {userInData ? <MemberList allMembers={userInData} /> : null}
            {newUsers ? <MemberList allMembers={newUsers} /> : null}
          </div>
          <button className="project-form-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
      <br />
    </div>
  );
}

export default ProjectForm;
