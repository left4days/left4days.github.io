const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.database();
const clicksRef = db.ref('server/saving-data/fireblog/clicks');

function sortByClicks(a, b) {
    const { clicks: aClicks } = a;
    const { clicks: bClicks } = b;
    if (aClicks > bClicks) {
        return -1;
    }

    if (aClicks < bClicks) {
        return 1;
    }

    return 0;
}

class ClickService {
    constructor() {
        this.clicks = 0;
    }

    async getUserClicksById(id) {
        let result = 0;

        await clicksRef.child(id).once('value', snap => {
            const clicks = snap.val();

            if (!isNaN(parseInt(clicks)) && clicks > 0) {
                result = clicks;
                return;
            }

            clicksRef.update({ [id]: 0 }).then(() => {
                result = 0;
            });
        });

        return result;
    }

    async updateUserClicks(userId, count) {
        let finalClicks = await this.getUserClicksById(userId);
        finalClicks += count;

        if (isNaN(count) || isNaN(finalClicks)) {
            return {
                success: false,
                errorMessage: 'implementData is wrong',
                meta: { count: isNaN(count), finalClicks: isNaN(finalClicks) },
            };
        }

        try {
            await clicksRef.update({
                [userId]: finalClicks,
            });
        } catch (err) {
            console.log('ERROR DB UPDATE CLICKS FOR', userId);
            console.log(err);

            return { finalClicks: finalClicks - count };
        }

        return { finalClicks };
    }

    async getTopClickers(limit) {
        let res = [];
        try {
            await clicksRef.once('value', snapshot => {
                res = Object.entries(snapshot.val())
                    .map(([uid, clicks]) => {
                        return {
                            uid,
                            clicks,
                        };
                    })
                    .sort(sortByClicks);
            });
        } catch (err) {
            console.log('ERROR DB GET TOP CLICKERS');
            console.log(err);

            return res;
        }

        return res;
    }
}

module.exports = ClickService;
