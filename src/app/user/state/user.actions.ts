import { createAction, props } from "@ngrx/store";

export const ADD_PRODUCT_START = "[user state] add product start";
export const ADD_PRODUCT_SUCCESS = "[user state] add product success";

export const GET_PRODUCTS_START = "[user state] get products start";
export const GET_PRODUCTS_SUCCESS = "[user state] get products success";

export const GET_LOSS_PRODUCTS_START = "[user state] get loss products start";
export const GET_LOSS_PRODUCTS_SUCCESS = "[user state] get loss products success";

export const ADD_LOSS_PRODUCT_START = "[user state] add loss product start";
export const ADD_LOSS_PRODUCT_SUCCESS = "[user state] add loss product success";

export const GET_PRODUCT_BY_UUID_START = "[user state] get product by uuid start";
export const GET_PRODUCT_BY_UUID_SUCCESS = "[user state] get product by uuid success";

export const RESTORE_LOSS_PRODUCT_START = "[user state] restore loss product start";
export const RESTORE_LOSS_PRODUCT_SUCCESS = "[user state] restore loss product success";


// export const getProductsStart = createAction(GET_PRODUCTS_START, props<{page: number}>());
export const getProductsStart = createAction(GET_PRODUCTS_START);
export const getProductsSuccess = createAction(GET_PRODUCTS_SUCCESS, props<{products: any}>());

export const getLossProductsStart = createAction(GET_LOSS_PRODUCTS_START);
export const getLossProductsSuccess = createAction(GET_LOSS_PRODUCTS_SUCCESS, props<{products: any}>());

export const addProductStart = createAction(ADD_PRODUCT_START, props<{product: FormData}>());
export const addProductSuccess = createAction(ADD_PRODUCT_SUCCESS);

export const addLossProductStart = createAction(ADD_LOSS_PRODUCT_START, props<{
  product_id: number,
  location: any,
  status: string
}>());
export const addLossProductSuccess = createAction(ADD_LOSS_PRODUCT_SUCCESS);

export const getProductByUuidStart = createAction(GET_PRODUCT_BY_UUID_START, props<{uuid: number}>());
export const getProductByUuidSuccess = createAction(GET_PRODUCT_BY_UUID_SUCCESS, props<{product: any}>());

export const restoreLossProductStart = createAction(RESTORE_LOSS_PRODUCT_START, props<{id: number}>());
export const restoreLossProductSuccess = createAction(RESTORE_LOSS_PRODUCT_SUCCESS);


export const TOGGLE_SELLABLE_START = "[user state] toggle sellable start";
export const TOGGLE_SELLABLE_SUCCESS = "[user state] toggle sellable success";

export const toggleSellableStart = createAction(TOGGLE_SELLABLE_START, props<{id: number}>());
export const toggleSellableSuccess = createAction(TOGGLE_SELLABLE_SUCCESS);

