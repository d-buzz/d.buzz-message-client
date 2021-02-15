import {
    AppFrame,
    Login,
    Chats,
    NoChatSelected
} from './components';

const routes = [
    {
        component: AppFrame,
        routes: [
            {
                path: '/login',
                exact: true,
                component: Login,
            },
            {
                path: '/chats',
                component: NoChatSelected,
                exact: true,
            },
            {
                path: '/chats/@:username',
                exact: true,
                component: Chats,
            },
        ],
    },
]

export default routes
