const UserService = require('../services/UserService');

const userService = new UserService();

async function checkIsUserExist(req, res, next) {
    res.json({ success: true });
}

async function getUserData(req, res, next) {
    const { userId } = req.params;
    console.log('test', res);
    const user = await userService.getUserById(userId);
    res.json(user);
}

async function registerUser(req, res, next) {
    const { id, errorMessage = 'user.create.failed' } = await userService.registerNewUser(req.body);

    if (id) {
        return res.json({ success: true });
    }

    res.status(403).json({ success: false, errorMessage });
}

async function loginUser(req, res, next) {
    const { success, errorMessage = 'user.login.failed' } = await userService.loginUser(req.body);

    if (success) {
        return res.json({ success });
    }

    res.status(403).json({ success: false, errorMessage });
}

module.exports = {
    GET: [['/api/v1/user/exist', checkIsUserExist], ['/api/v1/user/:userId', getUserData]],
    POST: [['/api/v1/user', registerUser], ['/api/v1/user/login', loginUser]],
};
