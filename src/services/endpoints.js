export const endpoints = {
    auth: {
        login: {
            post(payload) {
                return "/auth"
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
        }
    }
};
