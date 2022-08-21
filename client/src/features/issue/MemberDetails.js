import React from "react";

function MemberDetails({ member }) {
  console.log(member);
  const { username, email, phone_number, picture } = member;
  return <div>{username}</div>;
}

export default MemberDetails;
