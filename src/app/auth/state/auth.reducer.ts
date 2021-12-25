import { createReducer, on } from "@ngrx/store";
import { loginSuccess, logout, registerSuccess, updateUserInfoSuccess } from "./auth.actions";
import { initialState } from "./auth.state";

export const _authReducer = createReducer(initialState,
    on(loginSuccess, (state, action) => {
        return {
            ...state,
            authenticatedUser: action.authenticatedUser
        }
    }),
    on(registerSuccess, (state, action) => {
        return {
            ...state,
            authenticatedUser: action.authenticatedUser
        }
    }),
    on(updateUserInfoSuccess, (state, action) => {
        return {
            ...state,
            authenticatedUser: action.user
        }
    }),
    on(logout, (state, action) => {
      localStorage.removeItem("authUser");
        return {
            ...state,
            authenticatedUser: null
        }
    }),

    );

export function AuthReducer(state, action){

    return _authReducer(state, action);
}
