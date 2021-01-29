import { fromJS } from "immutable";
import {
    SET_SELECTED_CONTACT
} from "./actions"


const defaultState = fromJS({
    selectedContact: {}
});

export const chat = (state = defaultState, { type, payload }) => {
    switch (type) {
        case SET_SELECTED_CONTACT:
            return state.set('selectedContact', payload)
        default:
            return state;
    }
};
