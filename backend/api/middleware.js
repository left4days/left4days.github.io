const { auth } = require('firebase-admin');

const authService = auth();

async function requiresAuth(req, res, next) {
    const idToken = req.header('FIREBASE_AUTH_TOKEN');
    let decodedIdToken;

    try {
        decodedIdToken = await authService.verifyIdToken(idToken);
    } catch (error) {
        next(error);
        return;
    }

    req.user = decodedIdToken;
    next();
}

module.exports = {
    requiresAuth,
};
