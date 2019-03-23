const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.database();
const userRef = db.ref('server/saving-data/fireblog/users');

const ClickService = require('../services/ClickService');

const clickService = new ClickService();

class UserService {
    async getUserById(id) {
        let result = {};

        await userRef.child(id).once('value', snap => {
            result = snap.val();
        });

        const clicks = await clickService.getUserClicksById(id);

        return {
            ...result,
            clicks,
        };
    }

    async registerNewUser(data) {
        const { uid, login, registerBy } = data;
        try {
            await userRef.update({
                [uid]: {
                    role: 'user',
                    registerBy,
                    login,
                },
            });
        } catch (err) {
            console.log('ERROR DB UPDATE USER FOR', uid);
            console.log(err);
        }
    }

    async getTopClickers(params) {
        const { limit = 10 } = params;

        const topClickers = await clickService.getTopClickers(limit);

        return topClickers;
    }
}

module.exports = UserService;
