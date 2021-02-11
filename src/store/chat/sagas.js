import { select, call, put, takeEvery } from "redux-saga/effects";
import {
    SET_USERS_LIST_REQUEST,
    setChatUsersListSuccess,
    setChatUsersListFailure,
    setNewStatusUsers,
    setIsFetchingChats,
    SEND_MESSAGE_REQUEST,
    sendMessageSuccess,
    sendMessageFailure,
    RECEIVE_MESSAGE_REQUEST,
    receiveMessageSuccess,
    receiveMessageFailure,
    updateChatsData,
    SEARCH_ACCOUNT_REQUEST,
    searchAccountSuccess,
    searchAccountFailure
} from "./actions";

import { clearLocalStorage } from "./../../services/helper";
import {
    sendMessage,
    searchAccounts,
    keychainRequestTransfer,
} from "./../../services/api";
import ChatSocketServer from "./../../services/chatSocketServer";

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

        yield put(setIsFetchingChats(false))
        yield put(setNewStatusUsers(newUserStatus))
        yield put(setChatUsersListSuccess(chatListUsers, meta))
    } catch (err) {
        yield put(setChatUsersListFailure(err, meta))
    }
}

function* sendMessageRequest(payload, meta) {
    try {
        const {
            from: account_from,
            to: account_to,
            message,
            use_encrypt,
            amount,
            asset: currency
        } = payload

        const user = yield select(state => state.auth.get('user'))
        const { username, is_authenticated, useKeychain } = user;

        const selectedContact = yield select(state => state.chat.get('selectedContact'))
        const { username: main_user } = selectedContact

        let chatListUsers = yield select(state => state.chat.get('chatUsersList'))

        const params = {
            message,
            use_encrypt,
            amount,
            account_to,
            account_from,
            currency
        }
        let sendSuccess = false
        if (is_authenticated) {
            if (!useKeychain) {
                const response = yield sendMessage(params)
                const data = yield response.data;
                if (data.code === 200) {
                    yield ChatSocketServer.sendMessage(payload)
                    sendSuccess = true
                }
            } else {
                // implement keychain transfer here...
                const memo = use_encrypt === 1 ? `# ${message}` : message
                const response = yield keychainRequestTransfer(username, main_user, amount, memo, currency)
                if (response.success) {
                    yield ChatSocketServer.sendMessage(payload)
                    sendSuccess = true
                }
            }
        }

        if (sendSuccess && account_from === username) {
            if (chatListUsers.length > 0) {
                const index = chatListUsers.map(x => x.username).indexOf(main_user);
                if (index !== -1) {
                    chatListUsers[index].messages.push(payload)
                }
            }
        }
        yield put(updateChatsData(chatListUsers))
        yield put(sendMessageSuccess(payload, meta))
    } catch (err) {
        yield put(sendMessageFailure(err, meta))
    }
}

function* receiveMessageRequest(payload, meta) {
    try {
        const { to } = payload

        const user = yield select(state => state.auth.get('user'))
        const { username } = user;

        const selectedContact = yield select(state => state.chat.get('selectedContact'))
        const { username: main_user } = selectedContact

        let chatListUsers = yield select(state => state.chat.get('chatUsersList'))

        if (to === username) {
            if (chatListUsers.length > 0) {
                const index = chatListUsers.map(x => x.username).indexOf(main_user);
                if (index !== -1) {
                    chatListUsers[index].messages.push(payload)
                }
            }
        }
        yield put(updateChatsData(chatListUsers))
        yield put(receiveMessageSuccess(payload, meta))
    } catch (err) {
        yield put(receiveMessageFailure(err, meta))
    }
}

function* searchAccountRequest(payload, meta) {
    try {
        const { account, limit } = payload
        const q = account.trim()
        let accounts = []
        const response = yield searchAccounts({ account: q, limit })
        const data = yield response.data
        if (data.code === 200) {
            accounts = data.data
        }
        yield put(searchAccountSuccess(accounts, meta))
    } catch (err) {
        yield put(searchAccountFailure(err, meta))
    }
}

function* watchSetChatUsersListRequest({ payload, meta }) {
    yield call(setChatUsersListRequest, payload, meta)
}

function* watchSendMessageRequest({ payload, meta }) {
    yield call(sendMessageRequest, payload, meta)
}

function* watchReceiveMessageRequest({ payload, meta }) {
    yield call(receiveMessageRequest, payload, meta)
}

function* watchSearchAccountRequest({ payload, meta }) {
    yield call(searchAccountRequest, payload, meta)
}


export default function* sagas() {
    yield takeEvery(SET_USERS_LIST_REQUEST, watchSetChatUsersListRequest)
    yield takeEvery(SEND_MESSAGE_REQUEST, watchSendMessageRequest)
    yield takeEvery(RECEIVE_MESSAGE_REQUEST, watchReceiveMessageRequest)
    yield takeEvery(SEARCH_ACCOUNT_REQUEST, watchSearchAccountRequest)
}
