import { createAsyncThunk } from "@reduxjs/toolkit";

export function createProject({ name, description, start_date, end_date }) {
  return function (dispatch) {
    fetch("/projects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        start_date,
        end_date,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "projects/projectAdded",
          payload: data,
        });
      });
  };
}

export function retrieveProjects() {
  return function (dispatch) {
    dispatch({ type: "projects/retrieveProjects/pending" });
    fetch("/projects")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "projects/retrieveProjects/fulfilled",
          payload: data,
        });
      });
  };
}

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id }, thunkAPI) => {
    try {
      const res = await fetch(`/projects/${id}`, {
        method: "UPDATE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      console.log("data", data, res.status);
      return { ...data };
    } catch (err) {
      console.log("Error", err.res.data);
      return thunkAPI.rejectWithValue(err.res.data);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async ({ id }, thunkAPI) => {
    try {
      const res = await fetch(`/projects/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);
    } catch (err) {
      console.log("Error", err.res);
      return thunkAPI.rejectWithValue(err.res);
    }
  }
);

const initialState = [];

export default function projectReducer(projects = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "projects/projectAdded":
      return [...projects, payload];
    case "projects/retrieveProjects/fulfilled":
      return payload;
    case updateProject:
      return projects.map((project) => {
        if (project.id === payload.id) {
          return {
            ...project,
            ...payload,
          };
        } else {
          return project;
        }
      });
    case deleteProject:
      return projects.filter(({ id }) => id !== payload.id);
    default:
      return projects;
  }
}

// export const projectSlice = createSlice({
//   name: "projects",
//   initialState: {
//     name: "",
//     description: "",
//     start_date: "",
//     end_date: "",
//   },
//   reducers: {
//     createProject: (state, action) => {
//       console.log("payload", payload);
//       state.projects = payload.projects;
//     },
//   },
// });
