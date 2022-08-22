import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice";
import projectReducer from "../features/project/projectReducer";
import taskReducer from "../features/task/taskReducer";
import issueReducer from "../features/issue/issueReducer";
import dateReducer from "../features/issue/dateReducer";
import memberReducer from "../features/project/memberReducer";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    user: userReducer,
    tasks: taskReducer,
    issues: issueReducer,
    date: dateReducer,
    members: memberReducer,
  },
});
