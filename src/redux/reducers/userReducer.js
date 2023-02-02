import { ActionTypes } from "../contants/action-types";

export const userReducer = (state = {}, {type, payload}) => {
  switch (type) {
    case ActionTypes.SET_USER:
      return {...state, users: payload}
    default:
      return state
  }
}