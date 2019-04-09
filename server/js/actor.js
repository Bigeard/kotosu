"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Actor {
    constructor(pos, size, rot, name, type, sprites, status) {
        this.act = (level) => { };
        this.pos = pos;
        this.size = size;
        this.rot = rot;
        this.name = name;
        this.type = type;
        this.sprites = `../img/actors/${type}/${sprites}.png`;
        this.status = status;
    }
}
exports.Actor = Actor;
//# sourceMappingURL=actor.js.map