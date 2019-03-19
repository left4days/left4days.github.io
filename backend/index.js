const app = require('./server');
const debug = require('debug')('geneticdiamond:server');
const http = require('http');
const port = normalizePort(process.env.PORT || '3001');
const firebase = require('firebase-admin');

const serviceAccount = require('./firebaseKey.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://dragoneggteamepmire.firebaseio.com',
});

const db = firebase.database();

const ref = db.ref('server/saving-data/fireblog');

const usersRef = ref.child('users');
usersRef.set({
    alanisawesome: {
        date_of_birth: 'June 23, 1912',
        full_name: 'Alan Turing',
    },
    gracehop: {
        date_of_birth: 'December 9, 1906',
        full_name: 'Grace Hopper',
    },
});

app.set('port', port);

const server = http.createServer(app).listen(port);
console.log('-----------N-O-D-E--J-S-----------');
console.log('server has started on ' + port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;

    if (~port) {
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
