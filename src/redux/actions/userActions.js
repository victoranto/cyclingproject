import { ActionTypes } from "../contants/action-types";

export const setUser = (users) => {
  return {
    type: ActionTypes.SET_USER,
    payload: users
  }
}