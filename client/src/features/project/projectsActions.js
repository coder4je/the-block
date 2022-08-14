import {
  CREATE_PROJECT,
  RETRIEVE_PROJECTS,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  DELETE_ALL_PROJECTS,
} from "./projectActionTypes";
import ProjectService from "./ProjectService";

export const createProject = (name, description) => async (dispatch) => {
  try {
    const res = await ProjectService.create({ name, description });
    dispatch({
      type: CREATE_PROJECT,
      payload: res,
    });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveProjects = () => async (dispatch) => {
  try {
    const res = await ProjectService.getAll();
    dispatch({
      type: RETRIEVE_PROJECTS,
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateProject = (id, data) => async (dispatch) => {
  try {
    const res = await ProjectService.update(id, data);
    dispatch({
      type: UPDATE_PROJECT,
      payload: data,
    });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    await ProjectService.delete(id);
    dispatch({
      type: DELETE_PROJECT,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllProjects = () => async (dispatch) => {
  try {
    const res = await ProjectService.deleteAll();
    dispatch({
      type: DELETE_ALL_PROJECTS,
      payload: res,
    });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};
