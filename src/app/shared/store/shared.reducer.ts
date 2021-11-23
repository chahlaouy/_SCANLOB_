import { createReducer, on } from '@ngrx/store';
import {
  addCommentSuccess,
  addProductToCart,
  getCategoriesSuccess,
  getLatestProductsSuccess,
  getLossProductsSuccess,
  putProductComments,
  removeProductFromCart,
  sendMessageSuccess,
  setErrorMessage,
  setLoadingSpinner,
  setSuccessMessage,
} from './shared.actions';
import { initialState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoadingSpinner: action.status,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage,
    };
  }),
  on(setSuccessMessage, (state, action) => {
    return {
      ...state,
      successMessage: action.successMessage,
    };
  }),

  on(sendMessageSuccess, (state, action) => {
    return {
      ...state,
      messages: [action.message, ...state.messages ],
    };
  }),
  on(getLatestProductsSuccess, (state, action) => {
    return {
      ...state,
      products: [...action.products, ...state.products]
    }
  }),
  on(getCategoriesSuccess, (state, action) => {
    return {
      ...state,
      categories: action.categories
    }
  }),
  on(addProductToCart, (state, action) => {
    return {
      ...state,
      cart: [action.product, ...state.cart]
    }
  }),
  on(removeProductFromCart, (state, action) => {
    const products = state.cart.filter(prod => prod.id != action.id);
    return {
      ...state,
      cart: products
    }
  }),
  on(getLossProductsSuccess, (state, action) => {
    return {
      ...state,
      lossProducts: action.products
    }
  }),
  on(putProductComments, (state, action) => {
    return {
      ...state,
      productComments: action.comments
    }
  }),
  on(addCommentSuccess, (state, action) => {
    return {
      ...state,
      productComments: [action.comment.comment, ...state.productComments]
    }
  }),
);

export function SharedReducer(state, action) {
  return _sharedReducer(state, action);
}
