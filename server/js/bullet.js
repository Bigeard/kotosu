"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actor_1 = require("./actor");
class Bullet extends actor_1.Actor {
    constructor(pos, size, rot, name, type, sprites, status) {
        super(pos, size, rot, name, type, sprites, status);
        this.action = null;
        this.rotX = 0;
        this.rotY = 0;
        this.deleteBullet = (level) => {
            level.actors.splice(level.actors.findIndex(actor => actor instanceof Bullet && actor.pos === this.pos), 1);
        };
        this.act = (level) => {
            if (this.action === null) {
                this.pos.x += this.rotX / 2;
                this.pos.y -= this.rotY / 2;
            }
            if (level.limitAt(this.pos, this.size, 2) || this.action === 'touched')
                this.deleteBullet(level);
        };
        this.rotX = rot.x;
        this.rotY = rot.y;
    }
}
exports.Bullet = Bullet;
//# sourceMappingURL=bullet.js.map