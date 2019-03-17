const express = require('express');
const router = express.Router();

const userApi = require('./user');

function createRoutes(route) {
    const { GET = [], POST = [], PUT = [], DELETE = [] } = route;

    const GETREQ = GET.map(function(route) {
        const [ url, callback ] = route;
        console.log('-- add URL', url);
        router.get(url, callback);

    });

    router.get('/api/v1/user/:id', function (req, res) {
        res.json({ success: true });
    });
}

function applyRoutes(app) {
    createRoutes(userApi, router);
    app.use(router);
}

module.exports = applyRoutes;

