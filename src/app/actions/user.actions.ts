import { Action } from "@ngrx/store";
import { ActionTypes } from "./index";


export class RequestGetUserInfo implements Action {
  readonly type = ActionTypes.REQUEST_GET_USERINFO;
   constructor(public param) {}
}

export class ReceiveGetUserInfo implements Action {
  readonly type = ActionTypes.RECEIVED_GET_USERINFO;

  constructor(public payload: { data: any }) {}
}

export class FailGetUserInfo implements Action {
  readonly type = ActionTypes.FAILED_GET_USERINFO;

  constructor(public payload: { error: any }) {}
}

export type UserAction = RequestGetUserInfo | ReceiveGetUserInfo | FailGetUserInfo;