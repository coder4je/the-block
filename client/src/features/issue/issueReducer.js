export function createIssue({ issue_details, resolved, task_id }) {
  return function (dispatch) {
    dispatch({ type: "issues/createIssue/pending" });
    fetch("/issues", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issue_details,
        resolved,
        task_id,
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

export function getIssues({ id }) {
  return function (dispatch) {
    dispatch({ type: "issues/getIssues/pending" });
    fetch(`/issues/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "issues/getIssues/fulfilled",
          payload: data,
        });
      });
  };
}

export function addIssue(newIssue) {
  return {
    type: "Issue/addIssue",
    payload: newIssue,
  };
}

const initialState = [];

export default function issueReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "issues/createIssue/fulfilled":
      return { ...state, payload };
    case "issues/getIssues/fulfilled":
      return payload;
    case "Issue/addIssue":
      return payload;
    default:
      return state;
  }
}
