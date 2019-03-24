const { requiresAdmin } = require('./middleware');
const AppStateService = require('../services/AppStateService');

const appStateService = new AppStateService();

async function switchAppState(req, res, next) {
    const { body } = req;
    const { currentState = '' } = body;

    const result = await appStateService.switchAppState(currentState);

    res.json({ success: true, data: result });
}

async function getAppState(req, res, next) {
    const result = await appStateService.getAppState();

    res.json({ success: true, data: result });
}

module.exports = {
    GET: [['/api/v1/appState/state', getAppState]],
    POST: [['/api/v1/appState/switchState', requiresAdmin, switchAppState]],
};
