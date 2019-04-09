import * as io from 'socket.io-client';
import { Level } from './level';
import { setupSocket } from './socket';
import { Canvas } from './canvas';

const runAnimation = (display: Canvas) => {
    let lastTime: number = 0;
    let frame = (time: number) => {
        if (lastTime !== 0) {
            let step = Math.min(time - lastTime, 100) / 1000;
            display.drawFrame(step);
        }
        lastTime = time;
        requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
};

const runGame = () => {
    const level = new Level();
    const socket = io();
    setupSocket(socket, level);
    const display = new Canvas(document.body, level, socket);
    runAnimation(display);
};

window.onload = () => {
    runGame();
};