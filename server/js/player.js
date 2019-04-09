"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const vector2D_1 = require("./vector2D");
const actor_1 = require("./actor");
const bullet_1 = require("./bullet");
class Player extends actor_1.Actor {
    constructor(pos, size, rot, name, type, sprites, status) {
        super(pos.plus(new vector2D_1.Vector2D(size.x * 1.5, size.y * 1.5)), size, rot, name, type, sprites, status);
        this.speed = new vector2D_1.Vector2D(0, 0);
        this.shootCoolDown = 10;
        this.lastShoot = this.shootCoolDown;
        this.moveSpeed = app_1.scale / 3;
        this.controls = [false, false, false, false, false, false];
        this.move = (level) => {
            this.speed.x = 0;
            this.speed.y = 0;
            if (this.controls[1]) {
                this.speed.y -= this.moveSpeed;
                this.rot.x = 0;
                this.rot.y = 1;
            }
            if (this.controls[3]) {
                this.speed.y += this.moveSpeed;
                this.rot.x = 0;
                this.rot.y = -1;
            }
            if (this.controls[0]) {
                this.speed.x -= this.moveSpeed;
                this.rot.x = -1;
                this.rot.y = 0;
            }
            if (this.controls[2]) {
                this.speed.x += this.moveSpeed;
                this.rot.x = 1;
                this.rot.y = 0;
            }
            if (this.controls[0] && this.controls[1]) {
                this.rot.x = -1;
                this.rot.y = 1;
            }
            if (this.controls[2] && this.controls[1]) {
                this.rot.x = 1;
                this.rot.y = 1;
            }
            if (this.controls[0] && this.controls[3]) {
                this.rot.x = -1;
                this.rot.y = -1;
            }
            if (this.controls[2] && this.controls[3]) {
                this.rot.x = 1;
                this.rot.y = -1;
            }
            let step = 0.028;
            if (!level.limitAt(this.pos.plus(new vector2D_1.Vector2D(0, this.speed.y * step)), this.size, 0)) {
                this.pos = this.pos.plus(new vector2D_1.Vector2D(0, this.speed.y * step));
            }
            else {
                this.speed.y = 0;
            }
            if (!level.limitAt(this.pos.plus(new vector2D_1.Vector2D(this.speed.x * step, 0)), this.size, 0)) {
                this.pos = this.pos.plus(new vector2D_1.Vector2D(this.speed.x * step, 0));
            }
            else {
                this.speed.x = 0;
            }
        };
        this.shoot = (level) => {
            if (this.controls[4]) {
                if (this.lastShoot < this.shootCoolDown)
                    this.lastShoot++;
                else if (this.lastShoot >= this.shootCoolDown && this.controls[4]) {
                    level.actors.push(new bullet_1.Bullet(new vector2D_1.Vector2D(((this.pos.x + this.size.x / 2) - 0.07), ((this.pos.y + this.size.y / 2) - 0.07)), new vector2D_1.Vector2D(0.15, 0.15), this.rot, this.name, 'bullet', 'bullet', 'visible'));
                    this.lastShoot = 0;
                }
            }
        };
        this.dash = (level) => {
        };
        this.act = (level) => {
            if (this.status === 'visible') {
                this.dash(level);
                this.move(level);
                this.shoot(level);
            }
            let obstacle = level.actorAt(this);
            if (obstacle && obstacle instanceof bullet_1.Bullet && obstacle.name != this.name) {
                if (obstacle.action === null && this.status != 'invisible') {
                    obstacle.action = 'touched';
                    level.actors.forEach((player) => { if (player.name === this.name)
                        player.status = 'invisible'; });
                }
            }
        };
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map