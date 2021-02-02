export const SET_SELECTED_CONTACT = "SET_SELECTED_CONTACT";
export const setSelectedContact = (username) => ({
    type: SET_SELECTED_CONTACT,
    payload: { username },
});


export const SET_USERS_LIST_REQUEST = "SET_USERS_LIST_REQUEST";
export const setChatUsersListRequest = (response) => ({
    type: SET_USERS_LIST_REQUEST,
    payload: response,
    meta: {
        thunk: true,
    },
});


export const SET_USERS_LIST_SUCCESS = "SET_USERS_LIST_SUCCESS";
export const setChatUsersListSuccess = (response, meta) => ({
    type: SET_USERS_LIST_SUCCESS,
    payload: response,
    meta
});

export const SET_USERS_LIST_FAILURE = "SET_USERS_LIST_FAILURE";
export const setChatUsersListFailure = (response, meta) => ({
    type: SET_USERS_LIST_FAILURE,
    payload: response,
    meta
});

export const CLEAR_USER_LIST = "CLEAR_USER_LIST";
export const clearUserList = () => ({
    type: CLEAR_USER_LIST,
});


export const SET_NEW_STATUS_USERS = "SET_NEW_STATUS_USERS";
export const setNewStatusUsers = (users) => ({
    type: SET_NEW_STATUS_USERS,
    payload: users
});



