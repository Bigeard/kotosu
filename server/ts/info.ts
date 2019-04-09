import { level } from './app';
import { Player } from './player';
import { Actor } from './actor';

const genTable = (table: Array<any>, actor: Actor) => {
    return table.push({
        'Actor Name': actor.name,
        'Pos X': actor.pos.x,
        'Pos Y': actor.pos.y,
        'Rot X': actor.rot.x,
        'Rot Y': actor.rot.y,
        'Size X': actor.size.x,
        'Size Y': actor.size.y,
        'Sprites': actor.sprites,
        'Status': actor.status,
        'Type': actor.type
    });
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

export const info = rl.on('line', function (line: any) {
    rl.prompt();
    rl.set
    let cmd = line.trim();

    // Table list player ---------------------------------------------------------
    if (cmd == 'listPlayer') {
        if (level.actors.length != 0) {
            let tablePlayer: Array<any> = [];
            level.actors.forEach(actor => { if (actor instanceof Player) genTable(tablePlayer, actor); });
            console.table(tablePlayer);
        } else console.log('\x1b[33m%s\x1b[0m', 'Info : No players.');
    }
    // Table list actor ----------------------------------------------------------
    else if (cmd == 'listActor') {
        if (level.actors.length != 0) {
            let tableActor: Array<any> = [];
            level.actors.forEach(actor => genTable(tableActor, actor));
            console.table(tableActor);
        } else console.log('\x1b[33m%s\x1b[0m', 'Info : No actors.');
    }
    // Error ---------------------------------------------------------------------
    else console.log('\x1b[31m%s\x1b[0m', 'Error : this command does not exist.');
});


