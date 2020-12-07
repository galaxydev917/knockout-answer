import * as userAction from "../actions/user.actions";
import { ActionTypes } from "../actions/index";
import {UserState} from '../interfaces/interfaces'

export const initialState: UserState = {
  logined_userinfo: [],
  loading: false,
  error: null
};

export function reducer(
  state = initialState,
  action: userAction.UserAction
): UserState {
  switch (action.type) {
    case ActionTypes.REQUEST_GET_USERINFO: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case ActionTypes.RECEIVED_GET_USERINFO: {
      return {
        ...state,
        loading: false,
        logined_userinfo: action.payload.data
      };
    }
    case ActionTypes.FAILED_GET_USERINFO: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }

    default: {
      return state;
    }
  }
}

export const getItems = (state: UserState) => state.logined_userinfo;