const { requiresAuth } = require('./middleware');
const ClickService = require('../services/ClickService');

const clickService = new ClickService();

async function checkIsUserExist(req, res, next) {
    res.json({ success: false, errorMessage: 'This login already exist', meta: { login: false } });
}

async function updateUserClicks(req, res, next) {
    const { body, user } = req;
    const { count = 0 } = body;
    const { user_id = '' } = user;
    const result = await clickService.updateUserClicks(user_id, count);

    res.json({ success: true, data: result });
}

async function getUserClicks(req, res, next) {
    await clickService.getUserClicksById(req.body);
}

module.exports = {
    GET: [['/api/v1/click/:userId', requiresAuth, getUserClicks]],
    POST: [['/api/v1/click/', requiresAuth, updateUserClicks]],
};
