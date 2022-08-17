import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTask } from "./taskReducer";

function TaskForm() {
  const { handleSubmit, register, control } = useForm();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [complete, setComplete] = useState(false);

  const onSubmit = (e) => {
    const sendingData = {
      name: e.name,
      category: e.category,
      completion: complete,
      start_date: startDate,
      end_date: endDate,
    };
    console.log(sendingData);
    dispatch(createTask(sendingData));
  };

  return (
    <div className="task">
      <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Task Form</h1>
        <div>
          <label className="task-form-label">Name</label>
          <input
            className="task-form-name"
            type="text"
            placeholder="Project Name"
            {...register("name")}
          />
          <label className="task-form-label">Category</label>
          <input
            className="task-form-category"
            type="text"
            placeholder="Project category"
            {...register("category")}
          />
          <label className="task-form-label">Completion</label>
          <input
            className="task-form-completion"
            type="checkbox"
            name="completion"
            onClick={() => setComplete(!complete)}
            style={{ cursor: "pointer" }}
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

export default TaskForm;
