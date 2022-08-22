import React from "react";
import ReactRoundedImage from "react-rounded-image";

function MemberDetails({ member }) {
  console.log(member);
  return (
    <div>
      {member.picture ? (
        <div style={{ display: "flex" }}>
          <ReactRoundedImage
            image={member.picture}
            roundedSize="0"
            imageWidth="110"
            imageHeight="110"
          />
          {member.username}
          {member.email}
          {member.phone_number}
        </div>
      ) : null}
      <div>{member}</div>
      <br />
    </div>
  );
}

export default MemberDetails;
