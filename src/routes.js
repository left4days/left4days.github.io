import { Admin } from './modules/Admin';
import { Home } from './modules/Home';

export default [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/admin',
        component: Admin,
    },
];
