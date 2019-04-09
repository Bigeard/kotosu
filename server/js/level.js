"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector2D_1 = require("./vector2D");
const player_1 = require("./player");
const lib_1 = require("./lib");
class Level {
    constructor() {
        this.size = new vector2D_1.Vector2D(16, 16);
        this.actors = [];
        this.nPlayer = 0;
        this.nPlayerVisible = 0;
        this.win = '';
        this.time = Date.now();
        this.calculFrame = () => {
            this.act();
            this.actors.forEach((actor) => {
                actor.act(this);
                if (actor instanceof player_1.Player) {
                    if (actor.status === 'visible')
                        this.nPlayerVisible++;
                    this.nPlayer++;
                }
            });
        };
        this.act = () => {
            if (this.nPlayerVisible === 1 && this.nPlayer > 1) {
                this.actors.forEach((actor) => {
                    if (actor instanceof player_1.Player && actor.status === 'visible') {
                        this.win = actor.name;
                        console.log(`restart ${this.win} win`);
                    }
                    if (actor instanceof player_1.Player)
                        actor.pos = new vector2D_1.Vector2D(lib_1.getRandom(2, 15), lib_1.getRandom(2, 15));
                    actor.status = 'invisible';
                });
                this.time = Date.now();
            }
            if (Math.round(lib_1.getTime(this.time) / 1000) === 4)
                this.actors.forEach(actor => actor.status = 'visible');
            this.nPlayerVisible = 0;
            this.nPlayer = 0;
        };
        this.limitAt = (pos, size, moreLimit) => {
            let xStart = Math.floor(pos.x);
            let xEnd = Math.ceil(pos.x + size.x);
            let yStart = Math.floor(pos.y);
            let yEnd = Math.ceil(pos.y + size.y);
            if (xStart < 0 - moreLimit || xEnd > this.size.x + moreLimit || yStart < -moreLimit || yEnd > this.size.y + moreLimit)
                return true;
        };
        this.actorAt = (actor) => {
            let xStart = actor.pos.x;
            let xEnd = actor.pos.x + actor.size.x;
            let yStart = actor.pos.y;
            let yEnd = actor.pos.y + actor.size.y;
            var result = null;
            this.actors.forEach((other) => {
                let otherXStart = other.pos.x;
                let otherXEnd = other.pos.x + other.size.x;
                let otherYStart = other.pos.y;
                let otherYEnd = other.pos.y + other.size.y;
                if (!(otherXStart > xEnd || otherXEnd < xStart || otherYStart > yEnd || otherYEnd < yStart))
                    result = other;
            });
            return result;
        };
    }
}
exports.Level = Level;
//# sourceMappingURL=level.js.map