import { fromJS } from "immutable";
import {
    SET_SELECTED_CONTACT,
    SET_USERS_LIST_SUCCESS,
    CLEAR_USER_LIST,
    SET_NEW_STATUS_USERS
} from "./actions"


const defaultState = fromJS({
    chatUsersList: [],
    selectedContact: {},
    newStatusUsers: []
});

export const chat = (state = defaultState, { type, payload }) => {
    switch (type) {
        case SET_SELECTED_CONTACT:
            return state.set('selectedContact', payload)
        case SET_USERS_LIST_SUCCESS:
            return state.set('chatUsersList', payload)
        case CLEAR_USER_LIST:
            return state.set('chatUsersList', [])
        case SET_NEW_STATUS_USERS:
            return state.set('newStatusUsers', payload)
        default:
            return state;
    }
};
