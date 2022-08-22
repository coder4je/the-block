import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../features/auth/userSlice";
import { set } from "react-hook-form";
import ReactRoundedImage from "react-rounded-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightToBracket,
  faCube,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function Nav({ currentUser, updateUser }) {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(signOutUser());
    updateUser(!currentUser);
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
            <ReactRoundedImage
              image={currentUser.picture}
              roundedSize="0"
              imageWidth="40"
              imageHeight="40"
            />
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
