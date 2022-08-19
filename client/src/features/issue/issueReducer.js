export function createIssue({ issue, resolved, task_id, user_id }) {
  return function (dispatch) {
    dispatch({ type: "issues/createIssue/pending" });
    fetch("/issues", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issue,
        resolved,
        task_id,
        user_id,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "issues/createIssue/fulfilled",
          payload: data,
        })
      );
  };
}

export function getIssues() {
  return function (dispatch) {
    dispatch({ type: "issues/getIssues/pending" });
    fetch("/issues")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "issues/getIssues/fulfilled",
          payload: data,
        });
      });
  };
}

const initialState = [];

export default function issueReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "issues/createIssue/fulfilled":
      return { ...state, payload };
    default:
      return state;
  }
}
