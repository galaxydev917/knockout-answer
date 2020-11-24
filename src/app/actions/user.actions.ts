import { Action } from "@ngrx/store";

export enum ActionTypes {
  GetLoginedUserBegin = "[Data] Get LoginedUser begin",
  GetLoginedUserSuccess = "[Data] Get LoginedUser success",
  GetLoginedUserFailure = "[Data] Get LoginedUser failure"
}

export class GetLoginedUserBegin implements Action {
  readonly type = ActionTypes.GetLoginedUserBegin;
}

export class GetLoginedUserSuccess implements Action {
  readonly type = ActionTypes.GetLoginedUserSuccess;

  constructor(public payload: { data: any }) {}
}

export class GetLoginedUserFailure implements Action {
  readonly type = ActionTypes.GetLoginedUserFailure;

  constructor(public payload: { error: any }) {}
}

export type UserAction = GetLoginedUserBegin | GetLoginedUserSuccess | GetLoginedUserFailure;