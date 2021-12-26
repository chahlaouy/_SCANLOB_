import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, repeat } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import {
  addCommentStart,
  addCommentSuccess,
  addFoundProductStart,
  addFoundProductSuccess,
  getCategoriesStart,
  getCategoriesSuccess,
  getLatestProductsStart,
  getLatestProductsSuccess,
  getLossProductsStarts,
  getLossProductsSuccess,
  setErrorMessage,
  setLoadingSpinner,
  setSuccessMessage,
} from './shared.actions';
import { AppState } from 'src/app/state/app.state';
import { getChatroomsSuccess, getSingleChatroomsSuccess } from 'src/app/user/state/user.actions';

@Injectable()
export class SharedEffect {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private sharedService: SharedService,
    private router: Router
  ) {}

  // ADD FOUND PRODUCT

  addFoundProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addFoundProductStart),
      mergeMap((action) => {
        return this.sharedService
          .addFoundProduct(action.productUuid, action.location, action.status)
          .pipe(
            map((data) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.store.dispatch(setSuccessMessage({ successMessage: data }));
              this.store.dispatch(getSingleChatroomsSuccess({chatroom: data.chatroom}))
              return addFoundProductSuccess({routeId: data.chatroom.id});
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

  // REDIRECT ADD FOUND PRODUCT
  restoreLossProductRedirect$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(addFoundProductSuccess),
        map((action) => {
            this.router.navigate(['/chat/' + action.routeId]);
        })
    )
  }, {dispatch: false});

  //LATEST PRODUCTS EFFECTS

  getLatestProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLatestProductsStart),
      mergeMap((action) => {
        return this.sharedService.getLatestProducts(action.page).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const products = data;
            return getLatestProductsSuccess({ products });
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

  // GET CATEGORIES EFFECTS

  getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCategoriesStart),
      mergeMap((action) => {
        return this.sharedService.getAllCategories().pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const categories = data;
            return getCategoriesSuccess({ categories });
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

  // GET LOSS PRODUCTS

  getLossProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLossProductsStarts),
      mergeMap((action) => {
        return this.sharedService.getLossProducts().pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const products = data;
            return getLossProductsSuccess({ products });
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
        return this.sharedService
          .addComment(action.body, action.product_id)
          .pipe(
            map((comment) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return addCommentSuccess({ comment: comment });
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

  // getProductsAfterAddingComment$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(addCommentSuccess),
  //     mergeMap((action) => {
  //       return this.sharedService
  //         .addComment(action.body, action.product_id)
  //         .pipe(
  //           map((comment) => {
  //             this.store.dispatch(setLoadingSpinner({ status: false }));
  //             return addCommentSuccess({ comment: comment });
  //           })
  //         );
  //     }),
  //     catchError((errorResponse) => {
  //       this.store.dispatch(setLoadingSpinner({ status: false }));
  //       return of(setErrorMessage({ errorMessage: errorResponse.error }));
  //     }),
  //     repeat()
  //   );
  // });




}
