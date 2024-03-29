export const SET_THEME_REQUEST = 'SET_THEME_REQUEST'
export const SET_THEME_SUCCESS = 'SET_THEME_SUCCESS'
export const SET_THEME_FAILURE = 'SET_THEME_FAILURE'

export const setThemeRequest = (mode) => ({
    type: SET_THEME_REQUEST,
    payload: { mode },
    meta: {
        thunk: true,
    },
})

export const setThemeSuccess = (response, meta) => ({
    type: SET_THEME_SUCCESS,
    payload: response,
    meta,
})

export const setThemeFailure = (error, meta) => ({
    type: SET_THEME_FAILURE,
    payload: error,
    meta,
})

export const GET_SAVED_THEME_REQUEST = 'GET_SAVED_THEME_REQUEST'
export const GET_SAVED_THEME_SUCCESS = 'GET_SAVED_THEME_SUCCESS'
export const GET_SAVED_THEME_FAILURE = 'GET_SAVED_THEME_FAILURE'

export const getSavedThemeRequest = () => ({
    type: GET_SAVED_THEME_REQUEST,
    meta: {
        thunk: true,
    },
})

export const getSavedThemeSuccess = (response, meta) => ({
    type: GET_SAVED_THEME_SUCCESS,
    payload: response,
    meta,
})

export const getSavedThemeFailure = (error, meta) => ({
    type: GET_SAVED_THEME_FAILURE,
    payload: error,
    meta,
})

export const GENERATE_STYLES = 'GENERATE_STYLES'
export const generateStyles = (theme) => ({
    type: GENERATE_STYLES,
    payload: theme,
})

export const SET_LAYOUT_SETTINGS = "LAYOUT_SET_SETTINGS";
export const setLayoutSettings = (settings) => ({
    type: SET_LAYOUT_SETTINGS,
    payload: settings,
})

export const CHECK_VERSION_REQUEST = 'CHECK_VERSION_REQUEST'
export const CHECK_VERSION_SUCCESS = 'CHECK_VERSION_SUCCESS'

export const checkVersionRequest = () => ({
    type: CHECK_VERSION_REQUEST,
    meta: {
        thunk: true,
    },
})

export const checkVersionSuccess = (isLatest, meta) => ({
    type: CHECK_VERSION_SUCCESS,
    payload: isLatest,
    meta,
})
