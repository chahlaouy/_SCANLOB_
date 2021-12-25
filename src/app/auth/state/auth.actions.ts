import { createAction, props } from "@ngrx/store";
import { AuthenticatedUser } from "src/app/models/authenticated-user.model";
import { User } from "src/app/models/user.model";

export const LOGIN_START = "[auth page] login start";
export const LOGIN_SUCCESS = "[auth page] login success";
export const LOGIN_FAIL = "[auth page] login fail";
export const AUTO_LOGIN = "[auth page] auto login";

export const loginStart = createAction(LOGIN_START, props<{email: string, password: string}>());
export const loginSuccess = createAction(LOGIN_SUCCESS ,
    props<{ authenticatedUser: AuthenticatedUser }>()
    );
export const loginFail = createAction(LOGIN_FAIL);

export const REGISTER_START = "[auth page] register start";
export const REGISTER_SUCCESS = "[auth page] register success";
export const REGISTER_FAIL = "[auth page] register fail";

export const registerStart = createAction(REGISTER_START, props<
    {
        username: string,
        email: string,
        password: string,
        role: string,
        city: string,
        country: string,
        zip: string
    }
    >());
export const registerSuccess = createAction(REGISTER_SUCCESS ,
    props<{ authenticatedUser: AuthenticatedUser }>()
    );
export const registerFail = createAction(REGISTER_FAIL);

export const autoLogin = createAction(AUTO_LOGIN);

export const UPDATE_USER_INFO_START = "[auth page] update user info start";
export const UPDATE_USER_INFO_SUCCESS = "[auth page] update user info success";

export const updateUserInfoStart = createAction(UPDATE_USER_INFO_START, props<{user: any}>());

export const updateUserInfoSuccess = createAction(UPDATE_USER_INFO_SUCCESS, props<{user: AuthenticatedUser}>());

export const LOGOUT = "[auth page] logout";
export const logout = createAction(LOGOUT);
