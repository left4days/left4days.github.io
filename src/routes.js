import { AdminPanel } from './modules/Admin';
import { Home } from './modules/Home';
import { AuthPage } from './modules/AuthPage';

export default [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/admin',
        component: AdminPanel,
    },
    {
        path: '/auth',
        component: AuthPage,
        componentProps: {
            authType: 'auth',
        },
    },
    {
        path: '/register',
        component: AuthPage,
        componentProps: {
            authType: 'register',
        },
    },
];
