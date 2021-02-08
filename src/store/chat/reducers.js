import { fromJS } from "immutable";
import {
    SET_SELECTED_CONTACT,
    SET_USERS_LIST_SUCCESS,
    CLEAR_USER_LIST,
    SET_NEW_STATUS_USERS,
    SET_IS_FETCHING_CHATS,
    SEND_MESSAGE_SUCCESS,
    UPDATE_CHAT_DATA
} from "./actions"


const defaultState = fromJS({
    chatUsersList: [],
    selectedContact: {},
    newStatusUsers: [],
    isFetchingChats: true,
    newChat: {}
});

export const chat = (state = defaultState, { type, payload }) => {
    switch (type) {
        case SET_SELECTED_CONTACT:
            return state.set('selectedContact', payload)
        case SET_USERS_LIST_SUCCESS:
            return state.set('chatUsersList', payload)
        case UPDATE_CHAT_DATA:
            return state.set('chatUsersList', payload)
        case CLEAR_USER_LIST:
            return state.set('chatUsersList', [])
        case SET_NEW_STATUS_USERS:
            return state.set('newStatusUsers', payload)
        case SET_IS_FETCHING_CHATS:
            return state.set('isFetchingChats', payload)
        case SEND_MESSAGE_SUCCESS:
            return state.set('newChat', payload)
        default:
            return state;
    }
};