import { select, call, put, takeEvery } from "redux-saga/effects";
import {
    SET_USERS_LIST_REQUEST,
    setChatUsersListSuccess,
    setChatUsersListFailure,
    setNewStatusUsers,
    setIsFetchingChats,
    setLatestChat,

    SEND_MESSAGE_REQUEST,
    sendMessageSuccess,
    sendMessageFailure,

    RECEIVE_MESSAGE_REQUEST,
    receiveMessageSuccess,
    receiveMessageFailure,
    updateChatsData,

    SEARCH_ACCOUNT_REQUEST,
    searchAccountSuccess,
    searchAccountFailure,

    DECRYPT_MESSAGE_REQUEST,
    decryptMessageSuccess,
    decryptMessageFailure,

    REFRESH_CHATS_REQUEST,
    refreshChatsSuccess,
    refreshChatsFailure,

    GET_ONLINE_STATUS_REQUEST,
    getOnlineStatusSuccess,
    getOnlineStatusFailure
} from "./actions";

import { clearLocalStorage, sortArrayObject } from "./../../services/helper";
import {
    sendMessage,
    searchAccounts,
    getTransfers,
    keychainRequestTransfer,
    keychainDecodeMemos,
    getAccountOnlineStatus
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
        let chatListUsers = yield select(state => state.chat.get('chatUsersList'))
        if (!error) {
            if (singleUser) {
                if (chatListUsers.length > 0) {
                    const index = chatListUsers.findIndex(x => x.username === newChatList[0].username);
                    if (index !== -1) {
                        chatListUsers[index].online = 1;
                        newUserStatus.push(chatListUsers[index])
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

        const len = chatListUsers.length
        const latestChat = {
            lastNumber: len > 0 ? chatListUsers[0].lastNumber : 0,
            lastDate: len > 0 ? chatListUsers[0].lastDate : null
        }

        yield put(setLatestChat(latestChat.lastNumber, latestChat.lastDate))
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
            asset: currency,
            time
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
        let sendResponse = { success: false, message: "Failed to transfer", payload }
        let sendSuccess = false
        if (is_authenticated) {
            if (!useKeychain) {
                const response = yield sendMessage(params)
                const data = yield response.data;
                if (data.code === 200) {
                    yield ChatSocketServer.sendMessage(payload)
                    sendSuccess = true
                    sendResponse.success = true
                }
                sendResponse.message = data.message
            } else {
                // implement keychain transfer here...
                const memo = use_encrypt === 1 ? `# ${message}` : message
                const response = yield keychainRequestTransfer(username, main_user, amount, memo, currency)
                if (response.success) {
                    yield ChatSocketServer.sendMessage(payload)
                    sendSuccess = true
                    sendResponse.success = true
                }
                sendResponse.message = response.message
            }
        }

        if (sendSuccess) {
            if (account_from === username && chatListUsers.length > 0) {
                const index = chatListUsers.findIndex(x => x.username === main_user)
                if (index !== -1) {
                    chatListUsers[index].messages.push(payload)
                    // push to top contact with latest messages
                    if (index !== 0) {
                        const temp = chatListUsers[0]
                        const newChatist = [...chatListUsers]
                        newChatist[0] = chatListUsers[index]
                        newChatist[index] = temp;
                        chatListUsers = newChatist
                    }
                }
            }
            yield put(setLatestChat(0, time))
        }

        yield put(updateChatsData(chatListUsers))
        yield put(sendMessageSuccess(sendResponse, meta))
    } catch (err) {
        yield put(sendMessageFailure(err, meta))
    }
}

function* receiveMessageRequest(payload, meta) {
    try {
        const { to, from } = payload

        const user = yield select(state => state.auth.get('user'))
        const { username } = user;

        let chatListUsers = yield select(state => state.chat.get('chatUsersList'))
        if (to === username) {
            if (chatListUsers.length > 0) {
                const index = chatListUsers.findIndex(x => x.username === from)
                if (index !== -1) {
                    chatListUsers[index].messages.push(payload)
                    // push to top contact with latest messages
                    if (index !== 0) {
                        const temp = chatListUsers[0]
                        const newChatist = [...chatListUsers]
                        newChatist[0] = chatListUsers[index]
                        newChatist[index] = temp;
                        chatListUsers = newChatist
                    }
                } else {
                    const newContacts = [...chatListUsers];
                    const chatInterface = {
                        username: from,
                        messages: [payload],
                        online: 1,
                    }
                    newContacts.splice(0, 0, chatInterface);
                    chatListUsers = newContacts
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
        const q = account.trim().toLowerCase()
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

function* decryptMessageRequest(payload, meta) {
    try {
        const { transfer_number, memo } = payload

        const user = yield select(state => state.auth.get('user'))
        const { username, useKeychain } = user;

        const selectedContact = yield select(state => state.chat.get('selectedContact'))
        const { username: main_user } = selectedContact

        let result = { success: false, error: null }
        let decoded = ""
        if (useKeychain) {
            result = yield keychainDecodeMemos(username, memo)
            if (result.success) {
                decoded = result.result
            }
        }

        let chatListUsers = yield select(state => state.chat.get('chatUsersList'))
        if (chatListUsers.length > 0) {
            const index = chatListUsers.findIndex(x => x.username === main_user);
            if (index !== -1) {
                const messages = chatListUsers[index].messages
                const _index = messages.findIndex((x) => x.number === transfer_number)
                if (_index !== -1 && decoded) {
                    chatListUsers[index].messages[_index].decoded = decoded
                }
            }
        }

        yield put(updateChatsData(chatListUsers))
        yield put(decryptMessageSuccess(result, meta))
    } catch (err) {
        yield put(decryptMessageFailure(err, meta))
    }
}

function* refreshChatsRequest(payload, meta) {
    try {
        const user = yield select(state => state.auth.get('user'))
        const { username } = user;

        const latestChat = yield select(state => state.chat.get('latestChat'))
        const { lastDate, lastNumber } = latestChat

        let chatListUsers = yield select(state => state.chat.get('chatUsersList'))

        let newChats = []
        const response = yield getTransfers({ account: username })
        const data = yield response.data
        if (data.code === 200) {
            if (parseInt(lastNumber) > 0) {
                newChats = data.data.filter((x) => parseInt(x.number) > parseInt(lastNumber))
            } else {
                if (lastDate) {
                    newChats = data.data.filter((x) => new Date(x.time) > new Date(lastDate))
                }
            }
            if (newChats.length > 0) {
                const unique_users = [
                    ...new Set(newChats.map((item) => item.main_user)),
                ];

                unique_users.forEach((user) => {
                    const messages = newChats.filter((x) => x.main_user === user)
                    const index = chatListUsers.findIndex(x => x.username === user)
                    if (index !== -1) {
                        let newMessages = [...chatListUsers[index].messages, ...messages]
                        newMessages = newMessages.filter((obj, pos, arr) => {
                            return arr.map(mapObj => mapObj['number']).indexOf(obj['number']) === pos
                        })
                        const sortedData = sortArrayObject(newMessages, "number", "asc")
                        chatListUsers[index].messages = sortedData
                    }
                })
            }
        }
        yield put(updateChatsData(chatListUsers))
        yield put(refreshChatsSuccess(data, meta))
    } catch (err) {
        yield put(refreshChatsFailure(err, meta))
    }
}

function* getOnlineStatusRequest(payload, meta) {
    try {
        const { account } = payload

        let result = { username: account, online: 0 }
        const response = yield getAccountOnlineStatus({ account })
        const data = yield response.data
        if (data.code === 200) {
            result = data.data
        }
        yield put(getOnlineStatusSuccess(result, meta))
    } catch (err) {
        yield put(getOnlineStatusFailure(err, meta))
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

function* watchDecryptMessageRequest({ payload, meta }) {
    yield call(decryptMessageRequest, payload, meta)
}

function* watchRefreshChatsRequest({ payload, meta }) {
    yield call(refreshChatsRequest, payload, meta)
}

function* watchGetOnlineStatusRequest({ payload, meta }) {
    yield call(getOnlineStatusRequest, payload, meta)
}

export default function* sagas() {
    yield takeEvery(SET_USERS_LIST_REQUEST, watchSetChatUsersListRequest)
    yield takeEvery(SEND_MESSAGE_REQUEST, watchSendMessageRequest)
    yield takeEvery(RECEIVE_MESSAGE_REQUEST, watchReceiveMessageRequest)
    yield takeEvery(SEARCH_ACCOUNT_REQUEST, watchSearchAccountRequest)
    yield takeEvery(DECRYPT_MESSAGE_REQUEST, watchDecryptMessageRequest)
    yield takeEvery(REFRESH_CHATS_REQUEST, watchRefreshChatsRequest)
    yield takeEvery(GET_ONLINE_STATUS_REQUEST, watchGetOnlineStatusRequest)
}
