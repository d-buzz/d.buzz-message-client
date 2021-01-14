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
                    // console.log("response", response.data);
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