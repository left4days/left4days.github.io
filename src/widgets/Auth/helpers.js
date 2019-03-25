import { loginUser, registerUser, resetUser } from './firebase-configuration';

export function getAuthAction(authType, model) {
    const { login, email, password } = model;
    switch (authType) {
        case 'login':
            return loginUser(email, password);
        case 'reset':
            return resetUser(email);
        case 'auth':
        default:
            return registerUser(login, email, password, 'email');
    }
}
