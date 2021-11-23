import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, repeat } from 'rxjs/operators'
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { SharedService } from "../shared.service";
import { addCommentStart, addCommentSuccess, getCategoriesStart, getCategoriesSuccess, getLatestProductsStart, getLatestProductsSuccess, getLossProductsStarts, getLossProductsSuccess, setErrorMessage, setLoadingSpinner } from "./shared.actions";
import { AppState } from "src/app/state/app.state";



@Injectable()
export class SharedEffect{

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private sharedService: SharedService,
        private router: Router
    ){}


  // LATEST PRODUCTS EFFECTS

  getLatestProducts$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(getLatestProductsStart),
        mergeMap((action) => {
            return this.sharedService.getLatestProducts(action.page).pipe(
                map((data) => {
                    this.store.dispatch(setLoadingSpinner({status: false}));
                    const products = data;
                    return getLatestProductsSuccess({products});
                })
            )
        }), catchError(errorResponse => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            return of(setErrorMessage({errorMessage: errorResponse.error}));
        }), repeat()
    )
  });

  // GET CATEGORIES EFFECTS

  getCategories$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(getCategoriesStart),
        mergeMap((action) => {
            return this.sharedService.getAllCategories().pipe(
                map((data) => {
                    this.store.dispatch(setLoadingSpinner({status: false}));
                    const categories = data;
                    return getCategoriesSuccess({categories});
                })
            )
        }), catchError(errorResponse => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            return of(setErrorMessage({errorMessage: errorResponse.error}));
        }), repeat()
    )
  });

  // GET LOSS PRODUCTS

  getLossProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLossProductsStarts),
      mergeMap((action) => {
        return this.sharedService.getLossProducts().pipe(
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

  // ADD COMMENT

  addComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addCommentStart),
      mergeMap((action) => {
        return this.sharedService.addComment(action.body, action.product_id).pipe(
          map((comment) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return addCommentSuccess({comment: comment});
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


}
