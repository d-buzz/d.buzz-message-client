export const SET_SELECTED_CONTACT = "SET_SELECTED_CONTACT";

export const setSelectedContact = (username) => ({
    type: SET_SELECTED_CONTACT,
    payload: { username },
});

