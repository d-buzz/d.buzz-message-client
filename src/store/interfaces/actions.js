export const BROADCAST_NOTIFICATION = "BROADCAST_NOTIFICATION";

export const broadcastNotification = (severity, message) => ({
    type: BROADCAST_NOTIFICATION,
    payload: { open: true, severity, message },
});

