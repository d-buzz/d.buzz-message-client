import { fetchApi } from "./helper"
import * as ep from "./endpoints"
import { v4 as uuidv4 } from 'uuid'

// Own API
export const authenticateUser = (payload) => fetchApi(
    ep.endpoints.auth.login.post(payload), payload, 'post')

export const generateToken = (payload) => fetchApi(
    ep.endpoints.auth.generateToken.post(payload), payload, 'post')

export const sendMessage = (payload) => fetchApi(
    ep.endpoints.message.send.post(payload), payload, 'post')

export const getTransfers = (payload) => fetchApi(
    ep.endpoints.message.transfers.post(payload), payload, 'post')

export const getTAllransfersTo = (payload) => fetchApi(
    ep.endpoints.message.transferTo.post(payload), payload, 'post')

export const searchAccounts = (payload) => fetchApi(
    ep.endpoints.account.search.get(payload), payload, 'get')


// HIVE keychain API
export const keychainSignIn = (account) => {
    const challenge = { token: uuidv4() }
    const buffer = JSON.stringify(challenge, null, 0)
    return new Promise((resolve) => {
        window.hive_keychain.requestSignBuffer(
            account,
            buffer,
            'Posting',
            response => {
                resolve(response)
            },
        )
    })
}

export const keychainDecodeMemos = (account, memo) => {
    return new Promise((resolve) => {
        window.hive_keychain.requestVerifyKey(
            account,
            memo,
            'Memo',
            response => {
                resolve(response)
            },
        )
    })
}

export const keychainRequestTransfer = (account, to, amount, memo, currency) => {
    return new Promise((resolve) => {
        window.hive_keychain.requestTransfer(
            account,
            to,
            amount,
            memo,
            currency,
            response => {
                resolve(response)
            },
        )
    })
}