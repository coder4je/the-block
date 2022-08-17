export function createTask({
  name,
  category,
  completion,
  start_date,
  end_date,
}) {
  return function (dispatch) {
    dispatch({ type: "projects/createTask/pending" });
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
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "projects/createTask/fulfilled",
          payload: data,
        })
      );
  };
}

export function getProjects() {
  return function (dispatch) {
    dispatch({ type: "projects/getTasks/pending" });
    fetch("/tasks")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "projects/getTasks/fulfilled",
          payload: data,
        });
      });
  };
}

const initialState = [];

export default function taskReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "projects/createTask/fulfilled":
      return { ...state, payload };
    default:
      return state;
  }
}
