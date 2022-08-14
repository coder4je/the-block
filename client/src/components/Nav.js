import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Nav() {
  return (
    <div className="nav">
      <Link to={"/about"} className="nav-about">
        About
      </Link>
      <div className="nav-items">
        <li className="nav-item">
          <Link to={"/home"} className="nav-about">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/login"} className="nav-about">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/signup"} className="nav-about">
            Signup
          </Link>
        </li>
      </div>
    </div>
  );
}

export default Nav;
