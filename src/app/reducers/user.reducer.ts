import * as userAction from "../actions/user.actions";

export interface DataState {
  items: string[];
  loading: boolean;
  error: any;
}

export const initialState: DataState = {
  items: [],
  loading: false,
  error: null
};

export function reducer(
  state = initialState,
  action: userAction.UserAction
): DataState {
  switch (action.type) {
    case userAction.ActionTypes.GetLoginedUserBegin: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }
    case userAction.ActionTypes.GetLoginedUserSuccess: {
      return {
        ...state,
        loading: false,
        items: action.payload.data
      };
    }
    case userAction.ActionTypes.GetLoginedUserFailure: {
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

export const getItems = (state: DataState) => state.items;