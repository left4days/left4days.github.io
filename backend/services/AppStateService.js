const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.database();
const appStateRef = db.ref('server/saving-data/fireblog/appState');

class AppStateService {
    constructor() {
        this.clicks = 0;
    }

    async getAppState() {
        let state = 'ACTIVE';

        await appStateRef.once('value', snap => {
            const { actionState } = snap.val() || {};

            if (typeof actionState === 'string') {
                state = actionState;
                return;
            }
        });

        return state;
    }

    async switchAppState(currentState) {
        let newState = currentState;

        if (!currentState) {
            return { success: false, errorMessage: 'invalid state' };
        }

        newState = currentState === 'ACTIVE' ? 'FINISHED' : 'ACTIVE';

        try {
            await appStateRef.update({ actionState: newState });
        } catch (error) {
            console.log('ERROR IN CHANGE CURRENT APP STATE');
            console.log(error);
            return { success: false, errorMessage: 'ERROR IN CHANGE CURRENT APP STATE' };
        }

        return newState;
    }
}

module.exports = AppStateService;
