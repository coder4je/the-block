import { combineReducers } from "redux";
import projectReducer from "../project/projectReducer";
import userReducer from "../auth/userSlice";

const rootReducer = combineReducers({
  projects: projectReducer,
  user: userReducer,
});

export default rootReducer;
