import { fromJS } from "immutable";
import {
    BROADCAST_NOTIFICATION,
    SET_SEARCH_BOX_STATUS,
} from "./actions"


const defaultState = fromJS({
    notificationBoxData: {},
    searchBoxStatus: false
});

export const interfaces = (state = defaultState, { type, payload }) => {
    switch (type) {
        case BROADCAST_NOTIFICATION:
            return state.set('notificationBoxData', payload)
        case SET_SEARCH_BOX_STATUS:
            return state.set('searchBoxStatus', payload)
        default:
            return state;
    }
};
