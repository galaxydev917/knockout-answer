import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from "@ngrx/store";
  import { environment } from "../../environments/environment";
  import {UserState} from '../interfaces/interfaces'

  import * as userData from "./user.reducer";
  
  export interface AppState {
    logined_userinfo: UserState;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    logined_userinfo: userData.reducer
  };
  
  export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? []
    : [];
  
  export const getUserInfoState = (state: AppState ) => state.logined_userinfo;
  // export const getAllItems = createSelector(
  //   getDataState,
  //   fromData.getItems
  // );