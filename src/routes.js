import {
    AppFrame,
    Home,
    Login,
    Dashboard,
    Chats,
    Contacts
} from './components';

const routes = [
    {
        component: AppFrame,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/login',
                exact: true,
                component: Login,
            },
            {
                path: '/dashboard',
                exact: true,
                component: Dashboard
            },
            {
                path: '/chats',
                exact: true,
                component: Chats
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
