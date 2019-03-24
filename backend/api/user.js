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

async function registerUser(req, res) {
    const user = await userService.registerNewUser(req.body);

    res.json({ success: true });
}

async function getTopClickers(req, res) {
    const users = await userService.getTopClickers(req.params);

    res.json({ success: true, data: users });
}

async function getWinners(req, res) {
    const users = await userService.getWinners(req.params);

    res.json({ success: true, data: users });
}

module.exports = {
    GET: [
        ['/api/v1/user/exist', checkIsUserExist],
        ['/api/v1/user/:userId', getUserData],
        ['/api/v1/user/top/:limit', getTopClickers],
        ['/api/v1/user/winners/:limit', getWinners],
    ],
    POST: [['/api/v1/user', registerUser]],
};
