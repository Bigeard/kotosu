import { Vector2D } from './vector2D';
import { Actor } from './actor';
import { Level } from './level';

export class Bullet extends Actor {
    public action: string = null;
    public rotX: number = 0;
    public rotY: number = 0;

    constructor(pos: Vector2D, size: Vector2D, rot: Vector2D, name: string, type: string, sprites: string, status: string) {
        super(pos, size, rot, name, type, sprites, status);
        this.rotX = rot.x;
        this.rotY = rot.y;
    }

    public deleteBullet = (level: Level): void => {
        level.actors.splice(level.actors.findIndex(actor => actor instanceof Bullet && actor.pos === this.pos), 1);
    }

    public act = (level: Level): void => {
        if (this.action === null) {
            this.pos.x += this.rotX / 2;
            this.pos.y -= this.rotY / 2;
        }
        if (level.limitAt(this.pos, this.size, 2) || this.action === 'touched') this.deleteBullet(level);
    }
}