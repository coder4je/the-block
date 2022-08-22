import React from "react";
import MemberDetails from "./MemberDetails";

function NewMemberList({ allMembers }) {
  console.log(allMembers);
  const taskCard = allMembers.map((member) => {
    return <MemberDetails key={member.id} member={member} />;
  });
  return <div>{taskCard}</div>;
}
export default NewMemberList;
