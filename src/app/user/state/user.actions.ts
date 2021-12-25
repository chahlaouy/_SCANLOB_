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

export const toggleSellableStart = createAction(TOGGLE_SELLABLE_START, props<{id: number, price: any}>());
export const toggleSellableSuccess = createAction(TOGGLE_SELLABLE_SUCCESS);

export const GET_CHATROOMS_START = "[user state] get chatrooms start";
export const getChatroomsStart = createAction(GET_CHATROOMS_START);

export const GET_CHATROOMS_SUCCESS = "[user state] get chatrooms succes";
export const getChatroomsSuccess = createAction(GET_CHATROOMS_SUCCESS,
    props<{chatrooms: any}>()
    );

export const GET_SINGLE_CHATROOMS_SUCCESS = "[user state] get chatrooms single succes";
export const getSingleChatroomsSuccess = createAction(GET_SINGLE_CHATROOMS_SUCCESS,
    props<{chatroom: any}>()
    );

export const SEND_MESSAGE_START = "[user state] send message start";
export const sendMessageStart = createAction(SEND_MESSAGE_START, props<{body: string, id: number}>());

export const SEND_MESSAGE_SUCCESS = "[user state] get send message success";
export const sendMessageSuccess = createAction(SEND_MESSAGE_SUCCESS, props<{message: any}>());

export const SET_USER_MESSAGE = "[user state] set user messages";
export const setUserMessages = createAction(SET_USER_MESSAGE, props<{messages: any}>());

export const GET_BANK_ACCOUNT_START = "[user state] get bank account start";
export const getBankAccountStart = createAction(GET_BANK_ACCOUNT_START);

export const GET_BANK_ACCOUNT_SUCCESS = "[user state] get bank account success";
export const getBankAccountSuccess = createAction(GET_BANK_ACCOUNT_SUCCESS, props<{account: any}>());

export const SET_BANK_ACCOUNT_START = "[user state] set bank account start";
export const setBankAccountStart = createAction(SET_BANK_ACCOUNT_START, props<{account: any}>());

export const SET_BANK_ACCOUNT_SUCCESS = "[user state] set bank account success";
export const setBankAccountSuccess = createAction(SET_BANK_ACCOUNT_SUCCESS, props<{account: any}>());


export const RESET_FEILDS = '[shared state] reset Feilds';
export const resetFeilds = createAction(
  RESET_FEILDS);
