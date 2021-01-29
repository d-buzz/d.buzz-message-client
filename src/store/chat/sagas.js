import { select, call, put, takeEvery } from "redux-saga/effects";
import {
    SET_USERS_LIST_REQUEST,
    setChatUsersListSuccess,
    setChatUsersListFailure
} from "./actions";

function* setChatUsersListRequest(payload, meta) {
    try {
        const { error, chatList: newChatList, singleUser, userDisconnected } = payload
        let chatListUsers = yield select(state => state.chat.get('chatUsersList'))
        if (!error) {
            if (singleUser) {
                if (chatListUsers.length > 0) {
                    const index = chatListUsers.map(x => x.username).indexOf(newChatList[0].username);
                    if (index !== -1) {
                        chatListUsers[index].online = 1;
                    } else {
                        /* Adding new online user into chat list array */
                        chatListUsers = [...chatListUsers, ...newChatList];
                    }
                }
            } else if (userDisconnected) {
                const loggedOutUser = chatListUsers.findIndex((obj) => obj.username === newChatList.username);
                if (loggedOutUser >= 0) {
                    chatListUsers[loggedOutUser].online = 0;
                }
            } else {
                /* Updating entire chat list if user logs in. */
                chatListUsers = newChatList
            }
        }
        yield put(setChatUsersListSuccess(chatListUsers, meta))
    } catch (err) {
        yield put(setChatUsersListFailure(err, meta))
    }
}

function* watchSetChatUsersListRequest({ payload, meta }) {
    yield call(setChatUsersListRequest, payload, meta)
}

export default function* sagas() {
    yield takeEvery(SET_USERS_LIST_REQUEST, watchSetChatUsersListRequest)
}
