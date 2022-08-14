import { createAsyncThunk } from "@reduxjs/toolkit";

export const createProject = createAsyncThunk(
  "projects/createProject",
  async ({ name, description, start_date, end_date }, thunkAPI) => {
    try {
      const res = await fetch("/projects", {
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
      });
      let data = await res.json();
      console.log("data", data);
    } catch (err) {
      console.log("Error", err.response.data);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const retrieveProjects = createAsyncThunk(
  "projects/retrieveProjects",
  async (thunkAPI) => {
    try {
      const res = await fetch("/projects", {
        method: "GET",
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

const initialState = {
  name: "",
  description: "",
  start_date: "",
  end_date: "",
};

export default function projectReducer(projects = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case createProject:
      return [...projects, payload];
    case retrieveProjects:
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
