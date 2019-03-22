const firebaseAdmin = require('firebase-admin');
const database = firebaseAdmin.database();

class ClickService {
    constructor() {
        this.clicks = 0;
    }
    async getUserClicksById(id) {
        return { id, clicks: this.clicks };
    }

    async updateUserClicks(userId, count) {
        let finalClicks = await this.getUserClicksById(id);
        if (count > 0) {
            finalClicks += count;
            //connect to BD and update
            return { finalClicks };
        }
    }
}

module.exports = ClickService;
