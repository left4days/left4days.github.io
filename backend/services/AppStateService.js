const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.database();
const appStateRef = db.ref('server/saving-data/fireblog/appState');

const UserService = require('../services/UserService');

const userService = new UserService();

function stateFSM(currentState) {
    switch (currentState) {
        case 'DEV':
            return 'ACTIVE';
        case 'ACTIVE':
            return 'FINISHED';
        case 'FINISHED':
            return 'DEV';
        default:
            return currentState;
    }
}

class AppStateService {
    constructor() {
        this.lastVerifyDevTS = null;
    }

    async getAppState() {
        let state = 'ACTIVE';
        let main_winner = '';

        await appStateRef.once('value', snap => {
            const { actionState, mainWinner = '' } = snap.val() || {};

            if (typeof actionState === 'string') {
                state = actionState;
                main_winner = mainWinner;
            }
        });

        if (main_winner) {
            main_winner = await userService.getUserById(main_winner);
        }

        const { email = '' } = main_winner;

        return { state, mainWinnerEmail: email };
    }

    async checkDevAccess(password) {
        let isValid = false;

        await appStateRef.once('value', snap => {
            const { devPassword } = snap.val() || {};

            if (devPassword === password) {
                isValid = true;
                return;
            }
        });

        return isValid;
    }

    async switchAppState(currentState) {
        let newState = currentState;

        if (!currentState) {
            return { success: false, errorMessage: 'invalid state' };
        }

        newState = stateFSM(currentState);

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
