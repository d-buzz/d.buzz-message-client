import { fromJS } from "immutable";
import {
    AUTHENTICATE_USER_SUCCESS,
    SIGNOUT_USER_SUCCESS,
    GET_SAVED_USER_SUCCESS,
    SET_FROM_LOGIN,
} from "./actions";

const defaultState = fromJS({
    user: {},
    fromLogin: false
});

export const auth = (state = defaultState, { type, payload }) => {
    switch (type) {
        case AUTHENTICATE_USER_SUCCESS:
            return state.set("user", payload);
        case GET_SAVED_USER_SUCCESS:
            return state.set('user', payload)
        case SIGNOUT_USER_SUCCESS:
            return state.set("user", payload);
        case SET_FROM_LOGIN:
            return state.set("fromLogin", payload);
        default:
            return state;
    }
};
