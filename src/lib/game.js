const checkWin = require('./checkWin');
const RemoveListeners = require('./RemoveListeners');

function game(s1, s2) {
    let board = ['', '', '', '', '', '', '', '', ''];
    let moveCount = 0;
    s1.socket.emit('gameFound', {
        opponent: s2.username,
    });
    s2.socket.emit('gameFound', {
        opponent: s1.username,
    });
    let currentTurn = s1;
    s1.socket.emit('turn');
    s1.socket.on('move', (data) => {
        if (currentTurn != s1) {
            s1.socket.emit('invalid_turn');
        } else if (board[data.box] != '') {
            s1.socket.emit('wrong_turn');
        } else {
            currentTurn = s2;
            board[data.box] = 'O';
            s1.socket.emit('valid_move', {
                box: data.box,
                move: 'O',
            });
            s2.socket.emit('opponent_move', {
                box: data.box,
                move: 'O',
            });
            moveCount++;
            let res = checkWin(board, 'O');
            if (res == 1) {
                s1.socket.emit('win');
                s2.socket.emit('lose');
                RemoveListeners(s1.socket);
                RemoveListeners(s2.socket);
                return 1;
            }
            if (moveCount == 9) {
                s1.socket.emit('draw');
                s2.socket.emit('draw');
                RemoveListeners(s1.socket);
                RemoveListeners(s2.socket);
                return 0;
            }
            s2.socket.emit('turn');
        }
    });
    s2.socket.on('move', (data) => {
        if (currentTurn != s2) {
            s2.socket.emit('invalid_turn');
        } else if (board[data.box] != '') {
            s2.socket.emit('wrong_turn');
        } else {
            currentTurn = s1;
            board[data.box] = 'X';
            s2.socket.emit('valid_move', {
                box: data.box,
                move: 'X',
            });
            s1.socket.emit('opponent_move', {
                box: data.box,
                move: 'X',
            });
            moveCount++;
            let res = checkWin(board, 'X');
            if (res == 1) {
                s2.socket.emit('win');
                s1.socket.emit('lose');
                RemoveListeners(s1.socket);
                RemoveListeners(s2.socket);
                return -1;
            }
            s1.socket.emit('turn');
        }
    });
}

module.exports = game;
