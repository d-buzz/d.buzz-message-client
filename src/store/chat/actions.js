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

export const SET_IS_FETCHING_CHATS = "SET_IS_FETCHING_CHATS";
export const setIsFetchingChats = (status) => ({
    type: SET_IS_FETCHING_CHATS,
    payload: status
});

export const UPDATE_CHATS_DATA = "UPDATE_CHATS_DATA";
export const updateChatsData = (payload) => ({
    type: UPDATE_CHATS_DATA,
    payload
})

export const RECEIVE_MESSAGE_REQUEST = "RECEIVE_MESSAGE_REQUEST";
export const receiveMessageRequest = (payload) => ({
    type: RECEIVE_MESSAGE_REQUEST,
    payload,
    meta: {
        thunk: true,
    },
});

export const RECEIVE_MESSAGE_SUCCESS = "RECEIVE_MESSAGE_SUCCESS";
export const receiveMessageSuccess = (response, meta) => ({
    type: RECEIVE_MESSAGE_SUCCESS,
    response,
    meta
});

export const RECEIVE_MESSAGE_FAILURE = "RECEIVE_MESSAGE_FAILURE";
export const receiveMessageFailure = (response, meta) => ({
    type: RECEIVE_MESSAGE_FAILURE,
    response,
    meta
});


export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const sendMessageRequest = (response) => ({
    type: SEND_MESSAGE_REQUEST,
    payload: response,
    meta: {
        thunk: true,
    },
});

export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const sendMessageSuccess = (response, meta) => ({
    type: SEND_MESSAGE_SUCCESS,
    payload: response,
    meta
});

export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";
export const sendMessageFailure = (response, meta) => ({
    type: SEND_MESSAGE_FAILURE,
    payload: response,
    meta
});

export const SEARCH_ACCOUNT_REQUEST = "SEARCH_ACCOUNT_REQUEST";
export const searchAccountRequest = (account, limit = 5) => ({
    type: SEARCH_ACCOUNT_REQUEST,
    payload: { account, limit },
    meta: {
        thunk: true,
    },
});

export const SEARCH_ACCOUNT_SUCCESS = "SEARCH_ACCOUNT_SUCCESS";
export const searchAccountSuccess = (response, meta) => ({
    type: SEARCH_ACCOUNT_SUCCESS,
    payload: response,
    meta
});

export const SEARCH_ACCOUNT_FAILURE = "SEARCH_ACCOUNT_FAILURE";
export const searchAccountFailure = (response, meta) => ({
    type: SEARCH_ACCOUNT_FAILURE,
    payload: response,
    meta
});

export const CLEAR_SEARCH_RESULT = "CLEAR_SEARCH_RESULT";
export const clearSearchResult = () => ({
    type: CLEAR_SEARCH_RESULT,
});

export const DECRYPT_MESSAGE_REQUEST = "DECRYPT_MESSAGE_REQUEST";
export const decryptMessageRquest = (transfer_number, memo) => ({
    type: DECRYPT_MESSAGE_REQUEST,
    payload: { transfer_number, memo },
    meta: {
        thunk: true,
    },
});

export const DECRYPT_MESSAGE_SUCCESS = "DECRYPT_MESSAGE_SUCCESS";
export const decryptMessageSuccess = (response, meta) => ({
    type: DECRYPT_MESSAGE_SUCCESS,
    payload: response,
    meta
});

export const DECRYPT_MESSAGE_FAILURE = "DECRYPT_MESSAGE_FAILURE";
export const decryptMessageFailure = (response, meta) => ({
    type: DECRYPT_MESSAGE_FAILURE,
    payload: response,
    meta
});
