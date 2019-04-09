import { io, level } from './app';
import { Player } from './player';
import { Vector2D } from './vector2D';
import { Socket } from 'socket.io';
import { getRandom, getTime } from './lib';

export const startSocket = io.on('connection', (socket: Socket) => {
    console.log('\x1b[33m%s\x1b[1m', '[INFO] User connected!', socket.id);
    let currentPlayer: Player;
    let status = 'invisible';
    if(level.actors.length === 0) status = 'visible';
    currentPlayer = new Player(new Vector2D(getRandom(2, 15), getRandom(2, 15)), new Vector2D(0.5, 0.5), new Vector2D(0, 1), socket.id, 'player', 'player', status);

    socket.on('start', () => {
        level.actors.push(currentPlayer);
        console.log('\x1b[33m%s\x1b[1m', '[INFO] Player ' + currentPlayer.name + ' connecting!');
        socket.emit('connect')
    });

    socket.on('arrows', (arrows: Array<boolean>) => { 
        currentPlayer.controls = arrows;
        socket.emit('data', level.actors, Math.round(getTime(level.time)/1000), level.nPlayer, level.win);
    });

    socket.on('newPseudo', (newPseudo) => {
        level.actors[level.actors.findIndex(player => player.name === currentPlayer.name)].name = newPseudo;
    });

    socket.on('disconnect', () => {
        if (currentPlayer != null) {
            console.log('\x1b[33m%s\x1b[1m', '[INFO] Player ' + currentPlayer.name + ' disconnected.');
            level.actors.splice(level.actors.findIndex(player => player.name === currentPlayer.name),1);
        } else console.log('\x1b[33m%s\x1b[1m', '[INFO] Player disconnected.');
        socket.disconnect();
    });
});