import { Level } from './level';
import { arrows } from './keyboard';
import { Actor } from './actor';

export class Canvas {
	public canvas: HTMLCanvasElement = document.createElement('canvas');
	public cx: CanvasRenderingContext2D = this.canvas.getContext('2d', { alpha: false });
	public parent: HTMLElement;
	public scale: number = 16;
	public zoom: number = 3;

	public level: Level;

	public socket: SocketIOClient.Socket;

	public infoBool: boolean = false;
	public infoCoolDown: number = 8;
	public lastInfo: number = this.infoCoolDown;
	public debug: boolean = false;
	public restart: number = 0;
	public step: number;

	constructor(parent: HTMLElement, level: Level, socket: SocketIOClient.Socket) {
		this.parent = parent;
		this.socket = socket;
		this.genCanvas();
		this.level = level;
	}

	public genCanvas = (): void => {
		this.canvas.width = 16 * this.scale * this.zoom;
		this.canvas.height = 16 * this.scale * this.zoom;
		this.parent.appendChild(this.canvas);
		this.cx.scale(this.zoom, this.zoom);
		this.cx.imageSmoothingEnabled = false;
		this.cx.font = '5px undefined';
	}

	public infoText = (text: string): void => {
		this.cx.font = '20px undefined';
		this.cx.fillStyle = '#fff';
		this.cx.fillText(text, 15, 240);
		this.cx.font = '5px undefined';
	}

	public drawFrame = (step: number): void => {
		this.step = step;
		this.drawBckground();
		this.drawActors();
		this.startGame();
		this.level.ping = Date.now();
		this.socket.emit('arrows', Array.from(arrows.values()));

		let zoom = +(<HTMLInputElement>document.getElementById('zoom')).value;
		if (zoom != this.zoom && zoom > 0 && zoom < 40) {
			this.zoom = zoom;
			this.genCanvas();
		}

		let pseudo = (<HTMLInputElement>document.getElementById('pseudo')).value;
		if (pseudo != this.level.pseudo && pseudo != '') {
			this.socket.emit('newPseudo', pseudo);
			this.level.pseudo = pseudo;
		}
	}

	public drawBckground = (): void => {
		this.cx.fillStyle = '#3f3f42';
		this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	public startGame = (): void => {
		if (this.level.time < 4) {
			this.infoText(`Win: ${this.level.win.slice(0, 10)}`);
			this.cx.fillStyle = 'rgba(225,225,225,0.5)';
			if (this.level.time > 0) {
				this.cx.font = '40px undefined';
				this.cx.fillText(this.level.time.toString(), 120, 130);
			}
			this.cx.font = '5px undefined';
		}
	}

	public drawActors = (): void => {
		this.level.actors.forEach((actor: Actor, index: number) => {
			this.info(actor, index);
			if (actor.status != 'invisible') this.drawActor(actor);
		});
	}

	public drawActor = (actor: Actor): void => {
		let width: number = actor.size.x * this.scale;
		let height: number = actor.size.y * this.scale;
		let posX: number = actor.pos.x * this.scale;
		let posY: number = actor.pos.y * this.scale;
		let spriteX: number;
		let spriteY: number;
		let sprites: HTMLImageElement = document.createElement('img');

		if (actor.name === this.level.pseudo && actor.type === 'player') sprites.src = '../img/actors/player/player2.png'
		else sprites.src = actor.sprites;

		if (actor.rot.x === 0) spriteX = 1;
		else if (actor.rot.x === -1) spriteX = 0;
		else if (actor.rot.x === 1) spriteX = 2;
		if (actor.rot.y === 0) spriteY = 1;
		else if (actor.rot.y === -1) spriteY = 2;
		else if (actor.rot.y === 1) spriteY = 0;
		this.cx.drawImage(sprites, spriteX * width, spriteY * height, width, height, posX, posY, width, height);
	}

	public info = (actor: Actor, index: number): void => {
		if (this.level.disconnect) {
			this.cx.fillStyle = '#f00';
			this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.infoText('Disconnect...');
		}
		if (arrows.get('info')) {
			if (this.lastInfo < this.infoCoolDown) {
				this.lastInfo++;
			}
			else if (this.lastInfo >= this.infoCoolDown && arrows.get('info')) {
				this.infoBool ? this.infoBool = false : this.infoBool = true;
				this.lastInfo = 0;
			}
		}
		if (this.infoBool) {
			this.cx.fillStyle = '#fff';
			this.cx.fillText(`FPS: ${Math.round(this.step * 3600)}  |  Ping: ${Math.ceil(this.level.latency / 10) * 10}  |  Time: ${this.level.time}  |  N Player: ${this.level.nPlayer}`, 26, 10);
			this.cx.fillText(`Id | Name | PX | PY | RX | RY | Status`, 26, 18);
			if (actor.type != 'bullet' || this.debug) this.cx.fillText(`${index}-   ${actor.name.slice(0, 4)}   ${Math.round(actor.pos.x)}    ${Math.round(actor.pos.y)}    ${Math.round(actor.rot.x)}    ${Math.round(actor.rot.y)}    ${actor.status}`, 26, ((index * 8) + 26));
			this.cx.fillRect(actor.pos.x * 1.5, actor.pos.y * 1.5, actor.size.x * 2, actor.size.y * 2);
			this.cx.fillStyle = 'rgba(225,225,225,0.5)';
			this.cx.fillRect(actor.pos.x * this.scale, actor.pos.y * this.scale, actor.size.x * this.scale, actor.size.y * this.scale);
		}
	}
}