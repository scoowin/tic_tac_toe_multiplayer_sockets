const express = require('express');
const { removeAllListeners } = require('process');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const game = require('./lib/game');

require('dotenv').config();
const { PORT } = process.env;

app.use('/', express.static(__dirname + '/public'));

let playList = [];

io.on('connection', (socket) => {
    socket.on('search', (data) => {
        let p = {
            socket: socket,
            username: data.username,
        };
        playList.push(p);
        if (playList.length == 2) {
            let s1 = playList[0];
            let s2 = playList[1];
            playList.shift();
            playList.shift();
            game(s1, s2);
        }
    });
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
