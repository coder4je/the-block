import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ReactRoundedImage from "react-rounded-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightToBracket,
  faCube,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function Nav({ currentUser, updateUser }) {
  const navigate = useNavigate();
  const defaultURL =
    "data:image/jpeg;base64,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";

  const handleLogOut = () => {
    fetch("/api/logout", {
      method: "DELETE",
    }).then(() => updateUser());
    updateUser(null);
  };

  return (
    <div className="nav">
      <li className="nav-item">
        <Link to={"/"} className="nav-logo" style={{ color: "white  " }}>
          <FontAwesomeIcon icon={faCube} />
        </Link>
      </li>
      {!currentUser ? (
        <li className="nav-item">
          <Link to={"/"} className="nav-home" style={{ color: "white  " }}>
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </li>
      ) : (
        <li className="nav-item">
          <Link
            to={"/welcome"}
            className="nav-my-account"
            style={{ color: "white  " }}
          >
            {currentUser.picture ? (
              <ReactRoundedImage
                image={currentUser.picture}
                roundedSize="0"
                imageWidth="40"
                imageHeight="40"
              />
            ) : (
              <ReactRoundedImage
                image={defaultURL}
                roundedSize="0"
                imageWidth="40"
                imageHeight="40"
              />
            )}
          </Link>
        </li>
      )}
      {!currentUser ? (
        <li className="nav-item">
          <Link
            to={"/login"}
            className="nav-login"
            style={{ color: "white  " }}
          >
            <FontAwesomeIcon icon={faRightToBracket} />
          </Link>
        </li>
      ) : (
        <li className="nav-item" onClick={handleLogOut}>
          <Link to={"/"} className="nav-about" style={{ color: "white  " }}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Link>
        </li>
      )}
    </div>
  );
}

export default Nav;
