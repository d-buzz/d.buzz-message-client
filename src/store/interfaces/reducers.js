import { fromJS } from "immutable";
import {
    BROADCAST_NOTIFICATION
} from "./actions"


const defaultState = fromJS({
    notificationBoxData: {},
});

export const interfaces = (state = defaultState, { type, payload }) => {
    switch (type) {
        case BROADCAST_NOTIFICATION:
            return state.set('notificationBoxData', payload)
        default:
            return state;
    }
};
