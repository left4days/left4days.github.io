import firebase from 'firebase';
import axios from 'axios';
import get from 'lodash/get';
import { getFirebaseHeaderToken } from 'widgets/requestsHelpers';

export function registerUser(login, email, password, registerBy) {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async res => {
            const { user = {} } = res || {};
            const uid = get(res, 'user.uid', '');
            const data = { login, registerBy, uid, email };

            const options = await getFirebaseHeaderToken();

            return axios.post('api/v1/user', data, options);
        })
        .catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export function loginUser(email, password) {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });
}

export function signOutUser() {
    firebase
        .auth()
        .signOut()
        .then(function() {
            console.log('success');
        })
        .catch(function(error) {
            console.log('error');
        });
}

export function resetUser(email) {
    firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function() {
            console.log('email sends');
        })
        .catch(function(error) {
            console.log(error);
        });
}
