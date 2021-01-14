import { fetchApi } from "./helper"
import * as ep from "./endpoints"

export let authenticateUser = (payload) => fetchApi(
    ep.endpoints.auth.login.post(payload), payload, 'post')

export let sendMessage = (payload) => fetchApi(
    ep.endpoints.message.send.post(payload), payload, 'post')

export let getTransfers = (payload) => fetchApi(
    ep.endpoints.message.transfers.post(payload), payload, 'post')

export let getTAllransfersTo = (payload) => fetchApi(
    ep.endpoints.message.transferTo.post(payload), payload, 'post')