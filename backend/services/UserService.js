const firebaseAdmin = require('firebase-admin');
const get = require('lodash/get');
const db = firebaseAdmin.database();
const userRef = db.ref('server/saving-data/fireblog/users');
const appStateRef = db.ref('server/saving-data/fireblog/appState');

const ClickService = require('../services/ClickService');

const clickService = new ClickService();

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);

    return rand;
};

function getUniqIndexes({ from, to, limit }) {
    if (to < from || isNaN(parseInt(from)) || isNaN(parseInt(to)) || isNaN(parseInt(limit))) {
        return [];
    }

    const res = [];
    if (limit > to - from + 1) {
        limit = to - from + 1;
    }

    while (res.length < limit) {
        const currentIndex = randomInteger(from, to);
        if (res.indexOf(currentIndex) === -1) {
            res.push(currentIndex);
        }
    }

    return res;
}

class UserService {
    async getUserById(uid) {
        let result = {};

        await userRef.child(uid).once('value', snap => {
            result = snap.val();
        });

        const clicks = await clickService.getUserClicksById(uid);

        return {
            ...result,
            clicks,
            uid,
        };
    }

    async registerNewUser(data) {
        const { uid, login, registerBy, email } = data;
        try {
            await userRef.update({
                [uid]: {
                    role: 'user',
                    registerBy,
                    email,
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
        return await Promise.all(topClickers.map(({ uid }) => this.getUserById(uid)));
    }

    async generateWinners(params) {
        const { limit = 30 } = params;

        let participants = [];
        let winners = [];
        try {
            await userRef.once('value', snapshot => {
                participants = Object.entries(snapshot.val()).map(([uid]) => {
                    return uid;
                });
                // .filter(({ data }) => data.clicks > 10);
            });
        } catch (err) {
            console.log('ERROR DB GET TOP CLICKERS');
            console.log(err);

            return participants;
        }

        const participantsNumber = participants.length - 1;
        const winnersIndexes = getUniqIndexes({ from: 0, to: participantsNumber, limit });

        for (let idx of winnersIndexes) {
            winners.push(participants[idx]);
        }

        try {
            await appStateRef.update({
                winnerList: winners,
            });
        } catch (err) {
            console.log('ERROR DB UPDATE WINNERS LIST', winners);
            console.log(err);
        }

        return await Promise.all(winners.map(uid => this.getUserById(uid)));
    }

    async getWinners(params) {
        const { limit = 30 } = params;
        let winnerList = [];

        try {
            await appStateRef.once('value', snapshot => {
                winnerList = get(snapshot.val(), 'winnerList', []);
            });
        } catch (err) {
            console.log('ERROR DB GET WINNERS');
            console.log(err);

            return [];
        }

        return await Promise.all(winnerList.map(uid => this.getUserById(uid)));
    }
}

module.exports = UserService;
