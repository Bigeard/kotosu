import { scale } from './app';
import { Vector2D } from './vector2D';
import { Actor } from './actor';
import { Level } from './level';
import { Bullet } from './bullet';

export class Player extends Actor {
	public id: string;
	public speed: Vector2D = new Vector2D(0, 0);
	public shootCoolDown: number = 10;
	public lastShoot: number = this.shootCoolDown;
	public moveSpeed: number = scale / 3;
	public controls: Array<boolean> = [false, false, false, false, false, false];

	constructor(pos: Vector2D, size: Vector2D, rot: Vector2D, name: string, type: string, sprites: string, status: string) {
		super(pos.plus(new Vector2D(size.x * 1.5, size.y * 1.5)), size, rot, name, type, sprites, status);
	}

	public move = (level: Level): void => {
		this.speed.x = 0;
		this.speed.y = 0;

		// Up -------------------------------------
		if (this.controls[1]) {
			this.speed.y -= this.moveSpeed;
			this.rot.x = 0;
			this.rot.y = 1;
		} // Down --------------------------------
		if (this.controls[3]) {
			this.speed.y += this.moveSpeed;
			this.rot.x = 0;
			this.rot.y = -1;
		} // Left --------------------------------
		if (this.controls[0]) {
			this.speed.x -= this.moveSpeed;
			this.rot.x = -1;
			this.rot.y = 0;
		} // Right --------------------------------
		if (this.controls[2]) {
			this.speed.x += this.moveSpeed;
			this.rot.x = 1;
			this.rot.y = 0;
		} // Up-Left ------------------------------
		if (this.controls[0] && this.controls[1]) {
			this.rot.x = -1;
			this.rot.y = 1;
		} // Up-Right -----------------------------
		if (this.controls[2] && this.controls[1]) {
			this.rot.x = 1;
			this.rot.y = 1;
		} // Down-Left ----------------------------
		if (this.controls[0] && this.controls[3]) {
			this.rot.x = -1;
			this.rot.y = -1;
		} // Down-Right ---------------------------
		if (this.controls[2] && this.controls[3]) {
			this.rot.x = 1;
			this.rot.y = -1;
		} 

		let step = 0.028;
		if (!level.limitAt(this.pos.plus(new Vector2D(0, this.speed.y * step)), this.size, 0)) {
			this.pos = this.pos.plus(new Vector2D(0, this.speed.y * step));
		}
		else {
			this.speed.y = 0;
		}

		if (!level.limitAt(this.pos.plus(new Vector2D(this.speed.x * step, 0)), this.size, 0)) {
			this.pos = this.pos.plus(new Vector2D(this.speed.x * step, 0));
		}
		else {
			this.speed.x = 0;
		}

	}

	public shoot = (level: Level): void => {
		if (this.controls[4]) {
			if (this.lastShoot < this.shootCoolDown) this.lastShoot++;
			else if (this.lastShoot >= this.shootCoolDown && this.controls[4]) {
				level.actors.push(
					new Bullet(
						new Vector2D(((this.pos.x + this.size.x / 2) - 0.07), ((this.pos.y + this.size.y / 2) - 0.07)),
						new Vector2D(0.15, 0.15),
						this.rot,
						this.name,
						'bullet',
						'bullet',
						'visible'));
				this.lastShoot = 0;
			}
		}
	}

	public dash = (level: Level): void => {
	}

	public act = (level: Level): void => {

		if (this.status === 'visible') {
			this.dash(level);
			this.move(level);
			this.shoot(level);
		}

		let obstacle: Actor = level.actorAt(this);
		if (obstacle && obstacle instanceof Bullet && obstacle.name != this.name) {
			if (obstacle.action === null && this.status != 'invisible') {
				obstacle.action = 'touched';
				level.actors.forEach((player) => { if (player.name === this.name) player.status = 'invisible'; });
			}
		}
	}
}