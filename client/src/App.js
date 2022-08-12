import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import Nav from "./components/Nav";

import { selectUser } from "./features/auth/userSlice";

function App() {
  const user = useSelector(selectUser);

  return <Nav />;
}

export default App;
