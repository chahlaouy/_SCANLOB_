import { createAction, props } from "@ngrx/store";

export const SET_LOADING_SPINNER = '[shared state] loading spinner start';
export const setLoadingSpinner = createAction(SET_LOADING_SPINNER, props<{status: boolean}>());

export const SET_ERROR_MESSAGE = '[shared state] error message';
export const setErrorMessage = createAction(SET_ERROR_MESSAGE, props<{errorMessage: any}>());

export const SET_SUCCESS_MESSAGE = '[shared state] success message';
export const setSuccessMessage = createAction(SET_SUCCESS_MESSAGE, props<{successMessage: any}>());

export const GET_LATEST_PRODUCTS_START = "[shared state] get latest products start";
export const getLatestProductsStart = createAction(GET_LATEST_PRODUCTS_START, props<{page: number}>())

export const GET_LATEST_PRODUCTS_SUCCESS = "[shared state] get latest products success";
export const getLatestProductsSuccess = createAction(GET_LATEST_PRODUCTS_SUCCESS, props<{products: any}>())

export const GET_CATEGORIES_START = "[shared state] get categories start";
export const getCategoriesStart = createAction(GET_CATEGORIES_START)

export const GET_CATEGORIES_SUCCESS = "[shared state] get categories success";
export const getCategoriesSuccess = createAction(GET_CATEGORIES_SUCCESS, props<{categories: any}>());

export const GET_LOSS_PRODUCTS_START = "[shared state] get loss products start";
export const GET_LOSS_PRODUCTS_SUCCESS = "[shared state] get loss products success";

export const getLossProductsStarts = createAction(GET_LOSS_PRODUCTS_START);
export const getLossProductsSuccess = createAction(GET_LOSS_PRODUCTS_SUCCESS, props<{products: any}>());

export const ADD_PRODUCT_TO_CART = "[shared state] add product to cart";
export const addProductToCart = createAction(ADD_PRODUCT_TO_CART, props<{product: any}>());

export const REMOVE_PRODUCT_FROM_CART = "[shared state] remove product from cart";
export const removeProductFromCart = createAction(REMOVE_PRODUCT_FROM_CART, props<{id: number}>());

export const MAKE_PAYMENT = "[shared state] make payment";
export const makePayment = createAction(MAKE_PAYMENT, props<{cart: any}>());


export const ADD_FAVORITE_START = "[user state] add favorite start";
export const ADD_FAVORITE_SUCCESS = "[user state] add favorite success";

export const ADD_COMMENT_START = "[shared state] add comment start";
export const ADD_COMMENT_SUCCESS = "[shared state] add comment success";

export const addFavoriteStart = createAction(ADD_FAVORITE_START, props<{favorite: any}>());
export const addFavoriteSuccess = createAction(ADD_FAVORITE_SUCCESS);

export const addCommentStart = createAction(ADD_COMMENT_START, props<{
  body: any,
  product_id: number
}>());
export const addCommentSuccess = createAction(ADD_COMMENT_SUCCESS, props<{comment: any}>());

export const PUT_PRODUCTS_COMMENTS = "[shared state] put products comments";
export const putProductComments = createAction(PUT_PRODUCTS_COMMENTS, props<{comments: any}>());

export const ADD_FOUND_PRODUCT_START = "[shared state] add found product start";
export const ADD_FOUND_PRODUCT_SUCCESS = "[shared state] add found product success";
export const addFoundProductStart = createAction(ADD_FOUND_PRODUCT_START, props<{
  productUuid: number,
  location: any,
  status: any
  }>());
export const addFoundProductSuccess = createAction(ADD_FOUND_PRODUCT_SUCCESS, props<{routeId: any}>());









