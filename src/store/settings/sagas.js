import { call, put, takeEvery } from "redux-saga/effects"
import {
    GET_SAVED_THEME_REQUEST,
    getSavedThemeSuccess,
    getSavedThemeFailure,

    SET_THEME_REQUEST,
    setThemeSuccess,
    setThemeFailure,
} from './actions'
import {
    setItemLocalStorage,
    getItemLocalStorage,
} from "./../../services/helper";


function* getSavedThemeRequest(payload, meta) {
    let theme = { mode: 'dark' }
    try {
        let saved = yield call(getItemLocalStorage, 'theme')
        saved = JSON.parse(saved)
        if (saved !== null) {
            theme = saved
        }
        yield put(getSavedThemeSuccess(theme, meta))
    } catch (error) {
        yield put(getSavedThemeFailure(error, meta))
    }
}

function* setThemeRequest(payload, meta) {
    try {
        const { mode } = payload
        const theme = { mode }
        yield call(setItemLocalStorage, 'theme', JSON.stringify(theme))
        yield put(setThemeSuccess(theme, meta))
    } catch (error) {
        yield put(setThemeFailure(error, meta))
    }
}

function* watchGetSavedThemeRequest({ payload, meta }) {
    yield call(getSavedThemeRequest, payload, meta)
}

function* watchSetThemeRequest({ payload, meta }) {
    yield call(setThemeRequest, payload, meta)
}

export default function* sagas() {
    yield takeEvery(GET_SAVED_THEME_REQUEST, watchGetSavedThemeRequest)
    yield takeEvery(SET_THEME_REQUEST, watchSetThemeRequest)
}