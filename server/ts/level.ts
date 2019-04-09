import { Vector2D } from './vector2D';
import { Actor } from './actor';
import { Player } from './player';
import { getRandom, getTime } from './lib';

export class Level {
	public size: Vector2D = new Vector2D(16, 16);
	public actors: Array<Actor> = [];
	public nPlayer: number = 0;
	public nPlayerVisible: number = 0;
	public win: string = '';
	public time: number = Date.now();

	constructor() { }

	public calculFrame = (): void => {
		this.act();
		this.actors.forEach((actor: Actor) => {
			actor.act(this);
			if (actor instanceof Player ) {
				if (actor.status === 'visible') this.nPlayerVisible++;
				this.nPlayer++;
			}
		});
	}

	public act = (): void => {
		if (this.nPlayerVisible === 1 && this.nPlayer > 1) {
			this.actors.forEach((actor: Actor) => {
				if (actor instanceof Player && actor.status === 'visible') {
					this.win = actor.name;
					console.log(`restart ${this.win} win`);
				}
				if (actor instanceof Player) actor.pos = new Vector2D(getRandom(2, 15), getRandom(2, 15));
				actor.status = 'invisible';
			});
			this.time = Date.now();
		}
		if (Math.round(getTime(this.time) / 1000) === 4) this.actors.forEach(actor => actor.status = 'visible');
		this.nPlayerVisible = 0;
		this.nPlayer = 0;
	}

	public limitAt = (pos: Vector2D, size: Vector2D, moreLimit: number): boolean => {
		let xStart: number = Math.floor(pos.x);
		let xEnd: number = Math.ceil(pos.x + size.x);
		let yStart: number = Math.floor(pos.y);
		let yEnd: number = Math.ceil(pos.y + size.y);
		if (xStart < 0 - moreLimit || xEnd > this.size.x + moreLimit || yStart < -moreLimit || yEnd > this.size.y + moreLimit) return true;
	}

	public actorAt = (actor: Actor): Actor => {
		let xStart: number = actor.pos.x;
		let xEnd: number = actor.pos.x + actor.size.x;
		let yStart: number = actor.pos.y;
		let yEnd: number = actor.pos.y + actor.size.y;
		var result: Actor = null;
		this.actors.forEach((other: Actor) => {
			let otherXStart: number = other.pos.x;
			let otherXEnd: number = other.pos.x + other.size.x;
			let otherYStart: number = other.pos.y;
			let otherYEnd: number = other.pos.y + other.size.y;
			if (!(otherXStart > xEnd || otherXEnd < xStart || otherYStart > yEnd || otherYEnd < yStart)) result = other;
		});
		return result;
	}
}