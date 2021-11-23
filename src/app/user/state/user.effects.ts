import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, repeat } from 'rxjs/operators';
import {
  setErrorMessage,
  setLoadingSpinner,
  setSuccessMessage,
} from 'src/app/shared/store/shared.actions';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {
  addLossProductStart,
  addLossProductSuccess,
  addProductStart,
  getLossProductsStart,
  getLossProductsSuccess,
  getProductsStart,
  getProductsSuccess,
  restoreLossProductStart,
  restoreLossProductSuccess,

} from './user.actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  // GET USER PRODUCTS

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProductsStart),
      mergeMap((action) => {
        return this.userService.getUserProducts().pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const products = data;
            return getProductsSuccess({products});
          })
        );
      }),
      catchError((errorResponse) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return of(setErrorMessage({ errorMessage: errorResponse.error }));
      }),
      repeat()
    );
  });
  // GET USER LOSS PRODUCTS

  getLossProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLossProductsStart),
      mergeMap((action) => {
        return this.userService.getUserLossProducts().pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const products = data;
            return getLossProductsSuccess({products});
          })
        );
      }),
      catchError((errorResponse) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return of(setErrorMessage({ errorMessage: errorResponse.error }));
      }),
      repeat()
    );
  });

  // ADD PRODUCT

  addProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addProductStart),
      mergeMap((action) => {
        return this.userService.addUserProduct(action.product).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setSuccessMessage({ successMessage: data }));
            return getProductsStart();
          })
        );
      }),
      catchError((errorResponse) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return of(setErrorMessage({ errorMessage: errorResponse.error }));
      }),
      repeat()
    );
  });
  // ADD LOSS PRODUCT

  addLossProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addLossProductStart),
      mergeMap((action) => {
        return this.userService.addUserLossProduct(action.product_id, action.location, action.status).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setSuccessMessage({ successMessage: data }));
            return getLossProductsStart();
          })
        );
      }),
      catchError((errorResponse) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return of(setErrorMessage({ errorMessage: errorResponse.error }));
      }),
      repeat()
    );
  });
  // RESTORE LOSS PRODUCT

  restoreLossProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(restoreLossProductStart),
      mergeMap((action) => {
        return this.userService.restoreUserLossProduct(action.id).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setSuccessMessage({ successMessage: data }));
            return getLossProductsStart();
          })
        );
      }),
      catchError((errorResponse) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return of(setErrorMessage({ errorMessage: errorResponse.error }));
      }),
      repeat()
    );
  });

  // REDIRECT RESTORE LOSS PRODUCT
//   restoreLossProductRedirect$ = createEffect(() => {
//     return this.actions$.pipe(
//         ofType(restoreLossProductSuccess),
//         map((action) => {
//             this.router.navigate(['/']);
//         })
//     )
// }, {dispatch: false});

}
