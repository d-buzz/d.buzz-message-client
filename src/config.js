const ENV = process.env
const CONFIG = {
    APP_NAME: 'Private messaging app for D.buzz',
    APP_VERSION: '1.0.0',
    APP_HOST: 'http://localhost:3000',
    API_HOST: ENV.REACT_APP_CHAT_API,
    SOCKET_HOST: ENV.REACT_APP_CHAT_SOCKET,
    MIN_AMOUNT: 0.001,
    DEFAULT_ASSET: "HIVE"
}

export default CONFIG;