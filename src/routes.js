import {
    AppFrame,
    Login,
    Chats,
    Contacts,
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
            {
                path: '/contacts',
                exact: true,
                component: Contacts
            },
        ],
    },
]

export default routes
