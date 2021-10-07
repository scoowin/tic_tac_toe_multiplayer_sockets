const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const game = require('./lib/game');

//Using dotenv to import variables in .env file as process.env.VARIABLE_NAME
require('dotenv').config();
const { PORT } = process.env;

//Serve html pages from public folder
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

            //Run function game with sockets s1 and s2
            game(s1, s2);
        }
    });
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
