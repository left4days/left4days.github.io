class UserService {
    async getUserById(id) {
        console.log('here', id);
        return { nick: 'CocoMaster', registerType: 'TELEGRAM', clicks: 151, id }
    }
}

module.exports = UserService;