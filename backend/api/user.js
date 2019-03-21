const UserService = require('../services/UserService');

const userService = new UserService();

async function checkIsUserExist(req, res, next) {
    res.json({ success: true });
}

async function getUserData(req, res, next) {
    const { userId } = req.params;
    console.log('tests', res);
    const user = await userService.getUserById(userId);
}

async function registerUser(req) {
    await userService.registerNewUser(req.body);

}

async function loginUser(req) {
    await userService.loginUser(req.body);
}

module.exports = {
    GET: [['/api/v1/user/exist', checkIsUserExist], ['/api/v1/user/:userId', getUserData]],
    POST: [['/api/v1/user', registerUser], ['/api/v1/user/login', loginUser]],
};
