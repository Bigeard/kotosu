"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const player_1 = require("./player");
const vector2D_1 = require("./vector2D");
const lib_1 = require("./lib");
exports.startSocket = app_1.io.on('connection', (socket) => {
    console.log('\x1b[33m%s\x1b[1m', '[INFO] User connected!', socket.id);
    let currentPlayer;
    let status = 'invisible';
    if (app_1.level.actors.length === 0)
        status = 'visible';
    currentPlayer = new player_1.Player(new vector2D_1.Vector2D(lib_1.getRandom(2, 15), lib_1.getRandom(2, 15)), new vector2D_1.Vector2D(0.5, 0.5), new vector2D_1.Vector2D(0, 1), socket.id, 'player', 'player', status);
    socket.on('start', () => {
        app_1.level.actors.push(currentPlayer);
        console.log('\x1b[33m%s\x1b[1m', '[INFO] Player ' + currentPlayer.name + ' connecting!');
        socket.emit('connect');
    });
    socket.on('arrows', (arrows) => {
        currentPlayer.controls = arrows;
        socket.emit('data', app_1.level.actors, Math.round(lib_1.getTime(app_1.level.time) / 1000), app_1.level.nPlayer, app_1.level.win);
    });
    socket.on('newPseudo', (newPseudo) => {
        app_1.level.actors[app_1.level.actors.findIndex(player => player.name === currentPlayer.name)].name = newPseudo;
    });
    socket.on('disconnect', () => {
        if (currentPlayer != null) {
            console.log('\x1b[33m%s\x1b[1m', '[INFO] Player ' + currentPlayer.name + ' disconnected.');
            app_1.level.actors.splice(app_1.level.actors.findIndex(player => player.name === currentPlayer.name), 1);
        }
        else
            console.log('\x1b[33m%s\x1b[1m', '[INFO] Player disconnected.');
        socket.disconnect();
    });
});
//# sourceMappingURL=socket.js.map