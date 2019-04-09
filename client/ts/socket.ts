import { Level } from './level';
import { Actor } from './actor';

export const setupSocket = (socket: any, level: Level) => {

    // Socket start --------------------------------------------------------------------------------------------------------
    socket.emit('start');
    socket.on('connect', () => { level.pseudo = socket.id; })
    
    // Socket disconnect --------------------------------------------------------------------------------------------------
    socket.on('disconnect', () => {
        socket.close();
        level.disconnect = true;
        document.location.reload(true);
    });

    // Socket data --------------------------------------------------------------------------------------------------------
    socket.on('data', (actors: Array<Actor>, time: number, nPlayer: number, win: string) => {
        level.latency = Date.now() - level.ping;
        level.actors = actors;
        level.time = time;
        level.nPlayer = nPlayer;
        level.win = win;
    });
}