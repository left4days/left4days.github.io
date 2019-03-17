function checkIsUserExist(req, res, next) {
    res.json({ success: true });
}

function getUserData(req, res, next) {
    res.json({ nick: 'CocoMaster', registerType: 'TELEGRAM', clicks: 151 });
}

module.exports = {
    GET: [
        ['/api/v1/user/exist', checkIsUserExist],
        ['/api/v1/user/:userId', getUserData]
    ]
}