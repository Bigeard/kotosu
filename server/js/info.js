"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const player_1 = require("./player");
const genTable = (table, actor) => {
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
};
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
exports.info = rl.on('line', function (line) {
    rl.prompt();
    rl.set;
    let cmd = line.trim();
    if (cmd == 'listPlayer') {
        if (app_1.level.actors.length != 0) {
            let tablePlayer = [];
            app_1.level.actors.forEach(actor => { if (actor instanceof player_1.Player)
                genTable(tablePlayer, actor); });
            console.table(tablePlayer);
        }
        else
            console.log('\x1b[33m%s\x1b[0m', 'Info : No players.');
    }
    else if (cmd == 'listActor') {
        if (app_1.level.actors.length != 0) {
            let tableActor = [];
            app_1.level.actors.forEach(actor => genTable(tableActor, actor));
            console.table(tableActor);
        }
        else
            console.log('\x1b[33m%s\x1b[0m', 'Info : No actors.');
    }
    else
        console.log('\x1b[31m%s\x1b[0m', 'Error : this command does not exist.');
});
//# sourceMappingURL=info.js.map