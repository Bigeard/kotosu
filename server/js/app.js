"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
exports.io = io;
const level_1 = require("./level");
const socket_1 = require("./socket");
const info_1 = require("./info");
const port = process.env.PORT || 3000;
const level = new level_1.Level();
exports.level = level;
const scale = 16;
exports.scale = scale;
socket_1.startSocket;
info_1.info;
const updates = () => { level.calculFrame(); };
setInterval(updates, 1000 / 60);
app.use(express.static(__dirname + '/../../client'));
http.listen(port, '0.0.0.0', () => {
    console.log('\x1b[32m%s\x1b[0m', '----------===== Try My Best =====----------');
    console.log(`Server: http://localhost:${port}`);
    console.log('\x1b[32m%s\x1b[0m', '-------------------------------------------');
});
//# sourceMappingURL=app.js.map