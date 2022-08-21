import React from "react";
import MemberDetails from "./MemberDetails";

function MemberList({ allMembers }) {
  console.log(allMembers);
  const taskCard = allMembers.map((member) => {
    return <MemberDetails key={member.id} member={member} />;
  });
  console.log(taskCard);
  return <div>{taskCard}</div>;
}
export default MemberList;
