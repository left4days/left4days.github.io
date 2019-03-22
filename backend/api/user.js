const UserService = require('../services/UserService');

const userService = new UserService();

async function checkIsUserExist(req, res, next) {
    res.json({ success: false, errorMessage: 'This login already exist', meta: { login: false } });
}

async function getUserData(req, res, next) {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);

    res.json(user);
}

async function registerUser(req) {
    await userService.registerNewUser(req.body);
}

// async function loginUser(req) {
//     await userService.loginUser(req.body);
// }

module.exports = {
    GET: [['/api/v1/user/exist', checkIsUserExist], ['/api/v1/user/:userId', getUserData]],
    POST: [['/api/v1/user', registerUser]],
};
