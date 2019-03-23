const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.database();
const clicksRef = db.ref('server/saving-data/fireblog/clicks');

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
}

module.exports = ClickService;
