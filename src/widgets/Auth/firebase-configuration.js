import firebase from 'firebase';

export function registerUser(email, password) {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
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
            // Handle Errors here.
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
            // Sign-out successful.
        })
        .catch(function(error) {
            // An error happened.
        });
}
