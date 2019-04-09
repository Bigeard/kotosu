import { Vector2D } from './vector2D';

export class Actor {
    public pos: Vector2D;
    public size: Vector2D;
	public rot: Vector2D;
    public name: string;
    public type: string;
    public sprites: string;
    public status: string;

	constructor (pos: Vector2D, size: Vector2D, rot: Vector2D, name: string, type: string, sprites: string, status: string) {
        this.pos = pos;
        this.size = size;
        this.rot = rot;
        this.name = name;
        this.type = type;
        this.sprites = sprites;
        this.status = status;
    }
}