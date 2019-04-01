import { AdminPanel } from './modules/Admin';
import { Home } from './modules/Home';
import { AuthPage } from './modules/AuthPage';

export default [
    {
        path: '/',
        Component: Home,
        exact: true,
    },
    {
        path: '/admin',
        Component: AdminPanel,
    },
    {
        path: '/auth',
        Component: AuthPage,
        componentProps: {
            authType: 'auth',
        },
    },
    {
        path: '/register',
        Component: AuthPage,
        componentProps: {
            authType: 'register',
        },
    },
];
