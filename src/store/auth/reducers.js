import { fromJS } from "immutable";
import {
    AUTHENTICATE_USER_SUCCESS,
    SIGNOUT_USER_SUCCESS,
    GET_SAVED_USER_SUCCESS
} from "./actions";

const defaultState = fromJS({
    user: {},
});

export const auth = (state = defaultState, { type, payload }) => {
    switch (type) {
        case AUTHENTICATE_USER_SUCCESS:
            return state.set("user", payload);
        case GET_SAVED_USER_SUCCESS:
            return state.set('user', payload)
        case SIGNOUT_USER_SUCCESS:
            return state.set("user", payload);
        default:
            return state;
    }
};
