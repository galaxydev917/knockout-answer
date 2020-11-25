import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

import { UserService } from "../services/user/user.service";
import { ActionTypes } from "../actions/index";
import * as UserActions from "../actions/user.actions";

@Injectable()
export class UserEffects {
  constructor(private actions: Actions, private userService: UserService) {}

  @Effect()
  loadData = this.actions.pipe(
    ofType<UserActions.RequestGetUserInfo>(ActionTypes.REQUEST_GET_USERINFO),
    switchMap((payload) => {
      console.log("121212121212121212", payload.param);
      return this.userService.loadUserInfo(payload.param).pipe(
        map(data => new UserActions.ReceiveGetUserInfo({ data: data })),
        catchError(error =>
          of(new UserActions.FailGetUserInfo({ error: error }))
        )
      );
    })
  );
}