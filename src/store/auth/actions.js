export const AUTHENTICATE_USER_REQUEST = "AUTHENTICATE_USER_REQUEST";
export const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
export const AUTHENTICATE_USER_FAILURE = "AUTHENTICATE_USER_FAILURE";

export const GET_SAVED_USER_REQUEST = 'GET_SAVED_USER_REQUEST'
export const GET_SAVED_USER_SUCCESS = 'GET_SAVED_USER_SUCCESS'
export const GET_SAVED_USER_FAILURE = 'GET_SAVED_USER_FAILURE'

export const SIGNOUT_USER_REQUEST = "SIGNOUT_USER_REQUEST";
export const SIGNOUT_USER_SUCCESS = "SIGNOUT_USER_SUCCESS";
export const SIGNOUT_USER_FAILURE = "SIGNOUT_USER_FAILURE";

export const authenticateUserRequest = (username, password) => ({
    type: AUTHENTICATE_USER_REQUEST,
    payload: { username, password },
    meta: {
        thunk: true,
    },
});

export const authenticateUserSuccess = (response, meta) => ({
    type: AUTHENTICATE_USER_SUCCESS,
    payload: response,
    meta,
});

export const authenticateUserFailure = (error, meta) => ({
    type: AUTHENTICATE_USER_FAILURE,
    payload: error,
    meta,
});

export const signoutUserRequest = () => ({
    type: SIGNOUT_USER_REQUEST,
    meta: {
        thunk: true,
    },
});

export const signoutUserSuccess = (response, meta) => ({
    type: SIGNOUT_USER_SUCCESS,
    payload: response,
    meta,
});

export const signoutUserFailure = (error, meta) => ({
    type: SIGNOUT_USER_FAILURE,
    payload: error,
    meta,
});

export const getSavedUserRequest = () => ({
    type: GET_SAVED_USER_REQUEST,
    meta: {
        thunk: true,
    },
})

export const getSavedUserSuccess = (response, meta) => ({
    type: GET_SAVED_USER_SUCCESS,
    payload: response,
    meta,
})

export const getSavedUserFailure = (error, meta) => ({
    type: GET_SAVED_USER_FAILURE,
    payload: error,
    meta
})

export const SET_FROM_LOGIN = "SET_FROM_LOGIN";
export const setFromLogin = (status) => ({
    type: SET_FROM_LOGIN,
    payload: status,
})