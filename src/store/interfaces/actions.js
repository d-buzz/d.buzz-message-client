export const BROADCAST_NOTIFICATION = "BROADCAST_NOTIFICATION";

export const broadcastNotification = (severity, message) => ({
    type: BROADCAST_NOTIFICATION,
    payload: { open: true, severity, message },
});


export const SET_SEARCH_BOX_STATUS = 'SET_SEARCH_BOX_STATUS'

export const setSearchBoxStatus = (status) => ({
    type: SET_SEARCH_BOX_STATUS,
    payload: status,
})
