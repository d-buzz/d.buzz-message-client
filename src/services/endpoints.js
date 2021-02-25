export const endpoints = {
    auth: {
        login: {
            post(payload) {
                return "/auth"
            }
        },
        generateToken: {
            post(payload) {
                return "/auth/generate-token"
            }
        }
    },
    message: {
        send: {
            post(payload) {
                return "/message/send"
            }
        },
        transfers: {
            post(payload) {
                return "/message/transfers"
            }
        },
        transferTo: {
            post(payload) {
                return "/message/transfers-to"
            }
        },
        transfersGroup: {
            post(payload) {
                return "/message/transfers-group"
            }
        }
    },
    account: {
        search: {
            get(payload) {
                return `/account/search/@${payload.account}/${payload.limit}`
            }
        },
        isOnline: {
            get(payload) {
                return `/account/is-online/@${payload.account}`
            }
        }
    },
    version: {
        check: {
            get() {
                return "/version.json"
            }
        },
    }
};
