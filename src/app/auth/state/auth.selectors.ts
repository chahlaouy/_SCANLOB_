import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const AUTH_STATE_NAME = "auth";

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getAuthenticatedUser = createSelector(getAuthState, state => {
    return state.authenticatedUser;
});

export const getAuthenticatedUserToken = createSelector(getAuthState, state => {

  return state.authenticatedUser ? state.authenticatedUser.token : null;
})
