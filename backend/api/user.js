const UserService = require('../services/UserService');

const userService = new UserService();

async function checkIsUserExist(req, res, next) {
    res.json({ success: true });
}

async function getUserData(req, res, next) {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    res.json(user);
}

module.exports = {
    GET: [
        ['/api/v1/user/exist', checkIsUserExist],
        ['/api/v1/user/:userId', getUserData]
    ]
}