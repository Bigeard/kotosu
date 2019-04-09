import { Vector2D } from './vector2D';
import { Actor } from './actor';

export class Level {
	public size: Vector2D = new Vector2D(16, 16);
	public time: number = 0;
	public roundTime: number = 0;
	public endTime: number = 0;
	public actors: Array<Actor> = [];
	public ping: number = 0;
	public latency: number = 0;
	public win: string = '';
	public disconnect: boolean = false;
	public pseudo = '';
	public nPlayer = 0;
}