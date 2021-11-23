import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { AuthReducer } from "../auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../auth/state/auth.selectors";
import { AuthState } from "../auth/state/auth.state";


import { SharedReducer } from "../shared/store/shared.reducer";
import { SHARED_STATE_NAME } from "../shared/store/shared.selectors";
import { SharedState } from "../shared/store/shared.state";
import { UserReducer } from "../user/state/user.reducer";
import { USER_STATE_NAME } from "../user/state/user.selectors";
import { UserState } from "../user/state/user.state";

export interface AppState{
  [USER_STATE_NAME]: UserState,
  [AUTH_STATE_NAME]: AuthState,
  [SHARED_STATE_NAME]: SharedState,
  router: RouterReducerState
}

export const AppReducer = {
  [USER_STATE_NAME]: UserReducer,
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  router: routerReducer
}
