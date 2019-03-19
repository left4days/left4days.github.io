class UserService {
    async getUserById(id) {
        console.log('here', id);
        return { nick: 'CocoMaster', registerType: 'TELEGRAM', clicks: 151, id }
    }

    async registerNewUser(data) {
        const { login, email, password } = data;

        if(login.length > 5) {
            return { success: true };
        }

        if(id > 50) {
            return { nick: 'CocoMaster', registerType: 'TELEGRAM', clicks: 151, id }
        }

        return { errorMessage: 'Too late, dude'}
    }

    async loginUser(data) {
        const { login, password } = data;

        if(login.length < 12) {
            return { success: true };
        }

        return { errorMessage: 'Too late, dude'}
    }
}

module.exports = UserService;