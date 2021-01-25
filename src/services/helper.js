import axios from "axios";
import appConfig from "./../config"

export const fetchApi = async (
    endPoints,
    payload = {},
    methodParams = "POST",
    errorFull = false,
    header = {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Custom-Header",
    }
) => {
    axios.defaults.baseURL = appConfig.API_HOST;
    axios.interceptors.request.use((request) => {
        const token = getUserToken();
        if (token) {
            request.headers.common.Authorization = token;
        }
        return request;
    });

    switch (methodParams.toUpperCase()) {
        case "GET":
            return axios
                .get(appConfig.API_HOST + endPoints, { header })
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