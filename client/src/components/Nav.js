import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../features/auth/userSlice";
import { set } from "react-hook-form";

function Nav({ currentUser, updateUser }) {
  const dispatch = useDispatch();
  // const [authorizerUser, setAuthorizerUser] = useState(false);

  const handleLogOut = () => {
    dispatch(signOutUser());
    updateUser(!currentUser);
  };

  return (
    <div className="nav">
      <li className="nav-item">
        <Link to={"/about"} className="nav-about" style={{ color: "white  " }}>
          About
        </Link>
      </li>
      {!currentUser ? (
        <li className="nav-item">
          <Link to={"/"} className="nav-home" style={{ color: "white  " }}>
            Home
          </Link>
        </li>
      ) : (
        <li className="nav-item">
          <Link
            to={"/welcome"}
            className="nav-my-account"
            style={{ color: "white  " }}
          >
            My Page
          </Link>
        </li>
      )}
      {!currentUser ? (
        <li className="nav-item">
          <Link
            to={"/login"}
            className="nav-about"
            style={{ color: "white  " }}
          >
            Login
          </Link>
        </li>
      ) : (
        <li className="nav-item" onClick={handleLogOut}>
          <Link to={"/"} className="nav-about" style={{ color: "white  " }}>
            Logout
          </Link>
        </li>
      )}
    </div>
  );
}

export default Nav;
