import { fromJS } from "immutable";
import {
    SET_SELECTED_CONTACT,
    SET_USERS_LIST_SUCCESS,
} from "./actions"


const defaultState = fromJS({
    chatUsersList: [],
    selectedContact: {}
});

export const chat = (state = defaultState, { type, payload }) => {
    switch (type) {
        case SET_SELECTED_CONTACT:
            return state.set('selectedContact', payload)
        case SET_USERS_LIST_SUCCESS:
            return state.set('chatUsersList', payload)
        default:
            return state;
    }
};
