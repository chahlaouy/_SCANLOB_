import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { autoLogin, loginStart, loginSuccess, registerStart, registerSuccess, updateUserInfoStart, updateUserInfoSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap, repeat } from 'rxjs/operators'
import { setErrorMessage, setLoadingSpinner, setSuccessMessage } from "src/app/shared/store/shared.actions";
import { AppState } from "src/app/state/app.state";
import { Store } from "@ngrx/store";
import { ResponseJwt } from "src/app/models/response-jwt.model";
import { User } from "src/app/models/user.model";
import { AuthenticatedUser } from "src/app/models/authenticated-user.model";
import { of } from "rxjs";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffect{

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>,
        private router: Router
    ){}


    // USER INFO UPDATE EFFECTS

    $userInfoUpdate = createEffect(()=> {
      return this.actions$.pipe(
          ofType(updateUserInfoStart),
          mergeMap((action) => {
            console.log(action.user)
              return this.authService.updateUserInfo(action.user).pipe(
                  map((data) => {
                      this.store.dispatch(setLoadingSpinner({status: false}));
                      this.store.dispatch(setSuccessMessage({successMessage: {
                        success: "تم تحديثه بنجاح"
                      }}))
                      const user = this.authService.formatUser(data);
                      return updateUserInfoSuccess({user});
                  })
              )
          }), catchError(errorResponse => {
              this.store.dispatch(setLoadingSpinner({status: false}));
              return of(setErrorMessage({errorMessage: errorResponse.error}));
          }), repeat()
      )
  });


    $login = createEffect(()=> {
        return this.actions$.pipe(
            ofType(loginStart),
            mergeMap((action) => {
                return this.authService.login(action.email, action.password).pipe(
                    map((responseJwt) => {
                        this.store.dispatch(setLoadingSpinner({status: false}));
                        const authenticatedUser = this.authService.formatResponse(responseJwt);
                        this.authService.persistUser(authenticatedUser);
                        return loginSuccess({authenticatedUser})
                    })
                )
            }), catchError(errorResponse => {
                this.store.dispatch(setLoadingSpinner({status: false}));
                return of(setErrorMessage({errorMessage: errorResponse.error}));
            }), repeat()
        )
    });

    $register = createEffect(() => {
        return this.actions$.pipe(
            ofType(registerStart),
            mergeMap((action) => {
                return this.authService.register(action.username, action.email, action.password, action.role, action.city, action.country, action.zip).pipe(
                    map((responseJwt) => {
                        this.store.dispatch(setLoadingSpinner({status: false}));
                        const authenticatedUser = this.authService.formatResponse(responseJwt);
                        this.authService.persistUser(authenticatedUser);
                        return registerSuccess({authenticatedUser});
                    })
                )
            }), catchError(errorResponse => {
                this.store.dispatch(setLoadingSpinner({status: false}));
                return of(setErrorMessage({errorMessage: errorResponse.error}));
            }), repeat()
        )
    });

    $autoLogin = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogin),
            mergeMap(action => {
                const authenticatedUser = this.authService.getAuthenticatedUserFromLocalStorage();
                return of(loginSuccess({authenticatedUser}));
            })
        )
    })

    registerRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(registerSuccess),
            map((action) => {
                this.router.navigate(['/']);
            })
        )
    }, {dispatch: false});

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginSuccess),
            map((action) => {
                this.router.navigate(['/']);
            })
        )
    }, {dispatch: false});


}
