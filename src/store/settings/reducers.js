import {
    GET_SAVED_THEME_SUCCESS,
    SET_THEME_SUCCESS,
    GENERATE_STYLES,
    SET_LAYOUT_SETTINGS
} from './actions'
import { fromJS } from 'immutable'
import LayoutSettings from "./../../theme/LayoutSettings"

const defaultState = fromJS({
    theme: {},
    themeStyles: {},
    layoutSettings: {
        ...LayoutSettings
    }
})

export const settings = (state = defaultState, { type, payload }) => {
    switch (type) {
        case GET_SAVED_THEME_SUCCESS:
            return state.set('theme', payload)
        case SET_THEME_SUCCESS:
            return state.set('theme', payload)
        case GENERATE_STYLES:
            return state.set('themeStyles', payload)
        case SET_LAYOUT_SETTINGS:
            return state.set('layoutSettings', payload)
        default:
            return state
    }
}
