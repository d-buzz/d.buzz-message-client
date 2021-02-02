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
        }
    }
};
