// Express Server --------------------------------------------------------------------------------------------
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
import { Level } from './level';
import { startSocket } from './socket';
import { info } from './info';
const port = process.env.PORT || 3000;
const level = new Level();
const scale: number = 16;
export { io, level, scale }
startSocket
info
const updates = () => { level.calculFrame(); };
setInterval(updates, 1000 / 60);

// Load client ------------------------------------------------------------------------------------------------
app.use(express.static(__dirname + '/../../client'));

// Start server -----------------------------------------------------------------------------------------------
http.listen(port, '0.0.0.0', () => {
    console.log('\x1b[32m%s\x1b[0m', '----------===== Try My Best =====----------');
    console.log(`Server: http://localhost:${port}`);
    console.log('\x1b[32m%s\x1b[0m', '-------------------------------------------');
});

