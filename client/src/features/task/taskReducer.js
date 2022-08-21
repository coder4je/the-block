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

export function getTasks() {
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

export function addTask(newTask) {
  return {
    type: "tasks/addTask",
    payload: newTask,
  };
}

export function selectedTask(task) {
  return {
    type: "tasks/selectedTask",
    payload: task,
  };
}

const initialState = [];

export default function taskReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "tasks/createTask/fulfilled":
      return { ...state, payload };
    case "tasks/getTasks/fulfilled":
      return { ...state, payload };
    case "tasks/addTask":
      return { ...state, payload };
    case "tasks/selectedTask":
      return { ...state, payload };
    default:
      return state;
  }
}
