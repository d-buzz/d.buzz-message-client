import { call, put, takeEvery } from "redux-saga/effects";
import {
    AUTHENTICATE_USER_REQUEST,
    authenticateUserSuccess,
    authenticateUserFailure,
    GET_SAVED_USER_REQUEST,
    getSavedUserSuccess,
    getSavedUserFailure,
    SIGNOUT_USER_REQUEST,
    signoutUserSuccess,
    signoutUserFailure
} from "./actions";
import {
    setItemLocalStorage,
    getItemLocalStorage,
    removeItemLocalStorage
} from "./../../services/helper";
import { authenticateUser, keychainSignIn, generateToken } from "./../../services/api";

function* authenticateUserRequest(payload, meta) {
    try {
        const { username, password, useKeychain } = payload;
        const user = { username, useKeychain, is_authenticated: false };

        if (useKeychain) {
            const data = yield keychainSignIn(username)
            if (data.success) {
                const response = yield generateToken({ username });
                const data = yield response.data;
                if (data.code === 200) {
                    user.is_authenticated = true;
                    user.token = data.data;
                }
            }
        } else {
            const response = yield authenticateUser({ username, password });
            const data = yield response.data;
            if (data.code === 200) {
                user.is_authenticated = true;
                user.token = data.data;
            }
        }

        if (user.is_authenticated) {
            const session = JSON.stringify(user);
            yield call(setItemLocalStorage, "user", session);
        }

        yield put(authenticateUserSuccess(user, meta));
    } catch (error) {
        console.log(error);
        yield put(authenticateUserFailure(error, meta));
    }
}

function* getSavedUserRequest(meta) {
    let user = { username: "", is_authenticated: false };
    try {
        let saved = yield call(getItemLocalStorage, 'user')
        saved = JSON.parse(saved);
        if (saved !== null && saved.hasOwnProperty("token")) {
            user = saved;
        }
        yield put(getSavedUserSuccess(user, meta));
    } catch (error) {
        console.log(error);
        yield put(getSavedUserFailure(user, meta));
    }
}

function* signoutUserRequest(meta) {
    const user = { username: '', is_authenticated: false }
    try {
        yield call(removeItemLocalStorage, 'user')
        yield put(signoutUserSuccess(user, meta))
    } catch (error) {
        yield put(signoutUserFailure(error, meta))
    }
}

function* watchAuthenticateUserRequest({ payload, meta }) {
    yield call(authenticateUserRequest, payload, meta);
}

function* watchGetSavedUserRequest({ meta }) {
    yield call(getSavedUserRequest, meta);
}

function* watchSignoutUserRequest({ meta }) {
    yield call(signoutUserRequest, meta)
}

export default function* sagas() {
    yield takeEvery(AUTHENTICATE_USER_REQUEST, watchAuthenticateUserRequest);
    yield takeEvery(GET_SAVED_USER_REQUEST, watchGetSavedUserRequest);
    yield takeEvery(SIGNOUT_USER_REQUEST, watchSignoutUserRequest)
}
