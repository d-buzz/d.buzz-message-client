import {
    AppFrame,
    Home,
    Login,
    Dashboard
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
                component: Login
            },
            {
                path: '/dashboard',
                exact: true,
                component: Dashboard
            },
        ]
    }
]

export default routes;