import { select, call, put, takeEvery } from "redux-saga/effects";
import {
    SET_USERS_LIST_REQUEST,
    setChatUsersListSuccess,
    setChatUsersListFailure,
    setNewStatusUsers
} from "./actions";

import { clearLocalStorage } from "./../../services/helper";

function* setChatUsersListRequest(payload, meta) {
    try {
        const {
            error,
            message = '',
            chatList: newChatList,
            singleUser,
            userDisconnected = false,
            username: chatUser = ''
        } = payload

        let newUserStatus = []
        const user = yield select(state => state.auth.get('user'))
        const { username } = user;
        let chatListUsers = yield select(state => state.chat.get('chatUsersList'))
        if (!error) {
            if (singleUser) {
                if (chatListUsers.length > 0) {
                    const index = chatListUsers.map(x => x.username).indexOf(newChatList[0].username);
                    if (index !== -1) {
                        chatListUsers[index].online = 1;
                        newUserStatus.push(chatListUsers[index])
                    } else {
                        /* Adding new online user into chat list array */
                        if (newChatList[0].username !== username) {
                            chatListUsers = [...chatListUsers, ...newChatList];
                        }
                    }
                }
            } else if (userDisconnected && chatUser) {
                const loggedOutUser = chatListUsers.findIndex((obj) => obj.username === chatUser);
                if (loggedOutUser >= 0) {
                    chatListUsers[loggedOutUser].online = 0;
                    newUserStatus.push(chatListUsers[loggedOutUser])
                }
            } else {
                /* Updating entire chat list if user logs in. */
                chatListUsers = newChatList
            }
        } else {
            if (message === 'jwt expired') {
                yield call(clearLocalStorage)
                window.location.reload()
            }
        }

        yield put(setNewStatusUsers(newUserStatus))
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
