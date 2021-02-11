import { fromJS } from "immutable";
import {
    SET_SELECTED_CONTACT,
    SET_USERS_LIST_SUCCESS,
    CLEAR_USER_LIST,
    SET_NEW_STATUS_USERS,
    SET_IS_FETCHING_CHATS,
    SEND_MESSAGE_SUCCESS,
    RECEIVE_MESSAGE_SUCCESS,
    UPDATE_CHATS_DATA,
    SEARCH_ACCOUNT_SUCCESS,
    CLEAR_SEARCH_RESULT
} from "./actions"

const defaultState = fromJS({
    chatUsersList: [],
    selectedContact: {},
    newStatusUsers: [],
    isFetchingChats: true,
    newChat: {},
    searchResults: []
});

export const chat = (state = defaultState, { type, payload }) => {
    switch (type) {
        case SET_SELECTED_CONTACT:
            return state.set('selectedContact', payload)
        case SET_USERS_LIST_SUCCESS:
            return state.set('chatUsersList', payload)
        case UPDATE_CHATS_DATA:
            return state.set('chatUsersList', payload)
        case CLEAR_USER_LIST:
            return state.set('chatUsersList', [])
        case SET_NEW_STATUS_USERS:
            return state.set('newStatusUsers', payload)
        case SET_IS_FETCHING_CHATS:
            return state.set('isFetchingChats', payload)
        case SEND_MESSAGE_SUCCESS:
            return state.set('newChat', payload)
        case RECEIVE_MESSAGE_SUCCESS:
            return state.set('newChat', payload)
        case SEARCH_ACCOUNT_SUCCESS:
            return state.set('searchResults', payload)
        case CLEAR_SEARCH_RESULT:
            return state.set('searchResults', payload)
        default:
            return state;
    }
};
