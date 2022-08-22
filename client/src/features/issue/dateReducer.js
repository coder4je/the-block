export function addDate(selectedDate) {
  return {
    type: "date/addDate",
    payload: selectedDate,
  };
}

const initialState = [];

export default function dateReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "date/addDate":
      return payload;
    default:
      return state;
  }
}
