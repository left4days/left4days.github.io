const express = require('express');
const router = express.Router();

const userApi = require('./user');

function createRoutes(route) {
    const { GET = [], POST = [], PUT = [], DELETE = [] } = route;

    const GETREQ = GET.map(function(route) {
        const [ url, callback ] = route;
        router.get(url, callback);
    });
}

function applyRoutes(app) {
    createRoutes(userApi, router);
    router.get('/api/*', (req, res, next) => {
        res.json({ success: true, message: 'This api url is not declared' });
    })

    app.use(router);
}

module.exports = applyRoutes;

