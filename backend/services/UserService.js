const firebase = require('firebase');

class UserService {
    async getUserById(id) {
        return { nick: 'CocoMaster', registerType: 'TELEGRAM', clicks: 151, id };
    }

    async registerNewUser(data) {
        const { login, email, password } = data;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function() {
                console.log('email');
                return { login, email };
            })
            .catch(function(error) {
                console.log('err');
                const errorCode = error.code;
                const errorMessage = error.message;
                return { errorCode, errorMessage };
            });
    }

    async loginUser(data) {
        const { email, password, login } = data;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function() {
                return { login, email };
            })
            .catch(function(error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    async signOut(data) {
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
}

module.exports = UserService;
