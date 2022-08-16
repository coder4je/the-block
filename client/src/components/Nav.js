import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../features/auth/userSlice";

function Nav() {
  const dispatch = useDispatch();
  // const authorizedUser = useSelector((state) => state.user.payload);

  // const [username, email, phone_number, picture] = authorizedUser;

  // console.log(authorizedUser);
  // useEffect(() => {
  //   dispatch(authUser());
  // }, [dispatch]);

  const handleLogOut = () => {
    dispatch(signOutUser());
  };

  // console.log(authorizedUser);

  return (
    <div className="nav">
      <li className="nav-item">
        <Link to={"/about"} className="nav-about" style={{ color: "white  " }}>
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/home"} className="nav-about" style={{ color: "white  " }}>
          Home
        </Link>
      </li>
      {/* {authorizedUser ? (
        <li className="nav-item" onClick={handleLogOut}>
          <Link to={"/"} className="nav-about" style={{ color: "white  " }}>
            Logout
          </Link>
        </li>
      ) : (
        <li className="nav-item">
          <Link
            to={"/login"}
            className="nav-about"
            style={{ color: "white  " }}
          >
            Login
          </Link>
        </li>
      )} */}
    </div>
  );
}

export default Nav;
