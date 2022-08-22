import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function MemberForm({ currentEmail, setCurrentEmail, setShowForm }) {
  const { handleSubmit, register } = useForm();

  const onSubmit = (e) => {
    setShowForm(false);
    setCurrentEmail([...currentEmail, e.email]);
  };

  return (
    <form className="member-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="member-form"
        type="text"
        placeholder="enter email"
        {...register("email")}
      />
      <input type="submit" />
    </form>
  );
}

export default MemberForm;
