export function createProject({ name, description, start_date, end_date }) {
  return function (dispatch) {
    dispatch({ type: "projects/createProject/pending" });
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
      .then((data) =>
        dispatch({
          type: "projects/createProject/fulfilled",
          payload: data,
        })
      );
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

export function updateProject({ id, name, description, start_date, end_date }) {
  return function (dispatch) {
    fetch(`/projects/${id}`, {
      method: "PATCH",
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
      .then((data) =>
        dispatch({
          type: "projects/updateProject",
          payload: data,
        })
      );
  };
}

export function deleteProject({ id }) {
  return function (dispatch) {
    dispatch({ type: "projects/deleteProject" });
    fetch(`/projects/${id}`).then((res) => res.json());
  };
}

// export function selectedProject({ id }) {
//   return function (dispatch) {
//     dispatch({ type: "projects/selectedProject", payload: data });
//   };
// }

const initialState = [];

export default function projectReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "projects/createProject/fulfilled":
      return { ...state, payload };
    case "projects/retrieveProjects/fulfilled":
      return payload;
    case "projects/updateProject":
      return state.map((project) => {
        if (project.id === payload.id) {
          return {
            ...state,
            ...payload,
          };
        } else {
          return state;
        }
      });
    case "projects/deleteProject":
      return state.filter(({ id }) => id !== payload.id);

    case "projects/selectedProject": {
      // return state.map((project) => {
      //   if (project.id === payload.id) {
      //     return { ...state, project };
      //   }
      // });
      console.log(state);
      console.log(payload.id);
      return state.filter((project) => project.id === payload.id);
    }
    default:
      return state;
  }
}
