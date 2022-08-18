export function createTask({
  name,
  category,
  completion,
  start_date,
  end_date,
  project_id,
}) {
  return function (dispatch) {
    dispatch({ type: "tasks/createTask/pending" });
    fetch("/tasks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        category,
        completion,
        start_date,
        end_date,
        project_id,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "tasks/createTask/fulfilled",
          payload: data,
        })
      );
  };
}

export function getProjects() {
  return function (dispatch) {
    dispatch({ type: "tasks/getTasks/pending" });
    fetch("/tasks")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "tasks/getTasks/fulfilled",
          payload: data,
        });
      });
  };
}

const initialState = [];

export default function taskReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "tasks/createTask/fulfilled":
      return { ...state, payload };
    default:
      return state;
  }
}
