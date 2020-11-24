import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

import { UserService } from "../services/user/user.service";
import * as UserActions from "../actions/user.actions";

@Injectable()
export class UserEffects {
  constructor(private actions: Actions, private userService: UserService) {}

  @Effect()
  loadData = this.actions.pipe(
    ofType(UserActions.ActionTypes.GetLoginedUserBegin),
    switchMap(() => {
      return this.userService.loadData().pipe(
        map(data => new UserActions.GetLoginedUserSuccess({ data: data })),
        catchError(error =>
          of(new UserActions.GetLoginedUserFailure({ error: error }))
        )
      );
    })
  );
}