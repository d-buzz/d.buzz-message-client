import { combineReducers } from "redux";
import { fork, all } from "redux-saga/effects";
import { reducer as thunkReducer } from "redux-saga-thunk";
import { auth } from "./auth/reducers";
import { interfaces } from "./interfaces/reducers";
import * as authSagas from "./auth/sagas"

export const rootReducer = combineReducers({
    thunk: thunkReducer,
    auth,
    interfaces
});

export function* rootSaga() {
    yield all([
        ...Object.values(authSagas),
    ].map(fork));
}
