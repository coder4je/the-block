import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import Welcome from "./components/Welcome";
import ProjectForm from "./features/project/ProjectForm";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/project" element={<ProjectForm />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
