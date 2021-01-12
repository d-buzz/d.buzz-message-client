import { combineReducers } from "redux";
import { fork, all } from "redux-saga/effects";
import { reducer as thunkReducer } from "redux-saga-thunk";

export const rootReducer = combineReducers({
    thunk: thunkReducer,
});

export function* rootSaga() {
    yield all([
    ].map(fork));
}
