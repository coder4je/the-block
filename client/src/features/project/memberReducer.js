export function createMember({ project_id, user_id, member_email }) {
  return function (dispatch) {
    dispatch({ type: "members/createMember/pending" });
    fetch("/user_projects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id,
        user_id,
        member_email,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "members/createMember/fulfilled",
          payload: data,
        })
      );
  };
}

export function addMembers(member) {
  return {
    type: "members/addMember",
    payload: member,
  };
}

const initialState = [];

export default function memberReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "members/createMember/fulfilled":
      return { ...state, payload };

    case "members/addMember":
      return payload;
    default:
      return state;
  }
}
