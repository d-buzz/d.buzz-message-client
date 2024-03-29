import axios from "axios";
import appConfig from "./../config"

export const fetchApi = async (
    endPoints,
    payload = {}, 
    methodParams = "POST",
    customHost = null,
    errorFull = false,
    header = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Custom-Header",
    }
) => {
    const HOST = customHost || appConfig.API_HOST;
    axios.defaults.baseURL = HOST;

    if(!customHost) {
        axios.interceptors.request.use((request) => {
            const token = getUserToken();
            if (token) {
                request.headers.common.Authorization = token;
            }
            return request;
        });
    }

    switch (methodParams.toUpperCase()) {
        case "GET":
            return axios
                .get(HOST + endPoints, { header })
                .then(function (response) {
                    return response;
                })
                .catch(function (error) {
                    const { response } = error;
                    return errorFull ? error : response;
                });

        case "POST":
            return axios
                .post(endPoints, payload, { header })
                .then(function (response) {
                    return response;
                })
                .catch(function (error) {
                    const { response } = error;
                    return errorFull ? error : response;
                });
        default:
            break;
    }
};

export const setItemLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

export const getItemLocalStorage = (key) => {
    return localStorage.getItem(key)
};

export const removeItemLocalStorage = (key) => {
    localStorage.removeItem(key)
};

export const clearLocalStorage = () => {
    localStorage.clear();
};

export const getUserToken = () => {
    let user = getItemLocalStorage("user")
    user = JSON.parse(user)
    let token = null;
    if (user && user.hasOwnProperty("token")) {
        token = user.token
    }
    return token;
}

export const isMobile = () => {
    if (window) {
        return window.matchMedia(`(max-width: 767px)`).matches;
    }
    return false;
}

export const isMdScreen = () => {
    if (window) {
        return window.matchMedia(`(max-width: 1199px)`).matches;
    }
    return false;
}

export const classList = (classes) => {
    return Object.entries(classes)
        .filter(entry => entry[1])
        .map(entry => entry[0])
        .join(" ");
}


export const getQueryParam = (prop) => {
    let params = {};
    const search = decodeURIComponent(
        window.location.href.slice(window.location.href.indexOf("?") + 1)
    );
    const definitions = search.split("&");
    definitions.forEach(function (val, key) {
        let parts = val.split("=", 2);
        params[parts[0]] = parts[1];
    });
    return prop && prop in params ? params[prop] : params;
}

export const hasCompatibleKeychain = () => {
    return (
        window.hive_keychain &&
        window.hive_keychain.requestSignBuffer &&
        window.hive_keychain.requestBroadcast &&
        window.hive_keychain.requestSignedCall
    )
}


export const isMemoEncrypted = (memo) => {
    return memo && memo.charAt(0) === "#"
}

export const sortArrayObject = (arr, key, sort = "desc") => {
    if (sort === "desc") {
        arr = arr.sort(function (a, b) {
            return b[key] - a[key];
        });
    } else if (sort === "asc") {
        arr = arr.sort(function (a, b) {
            return a[key] - b[key];
        });
    }

    return arr;
};