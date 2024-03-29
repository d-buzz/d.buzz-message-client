import { call, put, takeEvery } from "redux-saga/effects"
import {
    GET_SAVED_THEME_REQUEST,
    getSavedThemeSuccess,
    getSavedThemeFailure,

    SET_THEME_REQUEST,
    setThemeSuccess,
    setThemeFailure,

    CHECK_VERSION_REQUEST,
    checkVersionSuccess,
} from './actions'
import {
    setItemLocalStorage,
    getItemLocalStorage,
} from "./../../services/helper";
import { checkVersion } from "./../../services/api";
import config from './../../config'


function* getSavedThemeRequest(payload, meta) {
    let theme = { mode: 'dark' }

    try {
        let saved = yield call(getItemLocalStorage, 'hpm_theme')
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
        yield call(setItemLocalStorage, 'hpm_theme', JSON.stringify(theme))
        yield put(setThemeSuccess(theme, meta))
    } catch (error) {
        yield put(setThemeFailure(error, meta))
    }
}

function* checkVersionRequest(meta) {
    let remote = yield call(checkVersion);
    remote = yield remote.data;

    let running = yield call(getItemLocalStorage, 'version');
    let latest = false;

    if (!running) {
        running = JSON.stringify(remote);
    } else {
        const { prod, dev } = JSON.parse(running);
        const { BRANCH } = config;

        latest = (BRANCH === 'dev' && dev === remote.dev) || (BRANCH === 'prod' && prod === remote.prod);
    }

    if (!latest) {
        yield call(setItemLocalStorage, "version", JSON.stringify(remote));
    }

    yield put(checkVersionSuccess(latest, meta));
}

function* watchGetSavedThemeRequest({ payload, meta }) {
    yield call(getSavedThemeRequest, payload, meta)
}

function* watchSetThemeRequest({ payload, meta }) {
    yield call(setThemeRequest, payload, meta)
}

function* watchCheckVersionRequest({ meta }) {
    yield call(checkVersionRequest, meta)
}

export default function* sagas() {
    yield takeEvery(GET_SAVED_THEME_REQUEST, watchGetSavedThemeRequest)
    yield takeEvery(SET_THEME_REQUEST, watchSetThemeRequest)
    yield takeEvery(CHECK_VERSION_REQUEST, watchCheckVersionRequest)
}
