import React from "react";
import MemberDetails from "./MemberDetails";

function MemberList({ allMembers }) {
  console.log(allMembers);
  const taskCard = allMembers.map((member) => {
    return <MemberDetails key={Math.random()} member={member} />;
  });
  return <div>{taskCard}</div>;
}
export default MemberList;
