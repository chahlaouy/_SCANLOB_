import { createReducer, on } from "@ngrx/store";
import { getLossProductsSuccess, getProductsSuccess } from "./user.actions";
import { initialState } from "./user.state";

export const _userReducer = createReducer(initialState,
    on(getProductsSuccess, (state, action) => {
        return {
            ...state,
            products: action.products
        }
    }),
    on(getLossProductsSuccess, (state, action) => {
      return {
          ...state,
          lossProducts: action.products
      }
    })

    );

export function UserReducer(state, action){

    return _userReducer(state, action);
}
