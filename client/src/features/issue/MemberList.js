import React from "react";
import MemberDetails from "./MemberDetails";

function MemberList({ allMembers, currentUser, update, setUpdate }) {
  console.log(allMembers);
  const taskCard = allMembers.map((member) => {
    return (
      <MemberDetails
        key={Math.random()}
        member={member.member_email}
        currentUser={currentUser}
        memberId={member.id}
        update={update}
        setUpdate={setUpdate}
      />
    );
  });
  return <div className="member-container">{taskCard}</div>;
}
export default MemberList;
