const checkWin = require('./checkWin');
const RemoveListeners = require('./RemoveListeners');

//Main driver code for game logic
function game(s1, s2) {
    //Initialize board and move count
    let board = ['', '', '', '', '', '', '', '', ''];
    let moveCount = 0;

    //Emit game found to both player clients
    s1.socket.emit('gameFound', {
        opponent: s2.username,
    });
    s2.socket.emit('gameFound', {
        opponent: s1.username,
    });

    //Set 1st turn to s1 and emit event informing the client of its turn
    let currentTurn = s1;
    s1.socket.emit('turn');

    //Handle move event from s1
    s1.socket.on('move', (data) => {
        if (currentTurn != s1) {
            //Emit invalid_turn if player makes a move but is not their turn
            s1.socket.emit('invalid_turn');
        } else if (board[data.box] != '') {
            //Emit wrong_turn if player makes an illegal move
            s1.socket.emit('wrong_turn');
        } else {
            //Set current turn to next player and update box in case of valid turn and move
            currentTurn = s2;
            board[data.box] = 'O';

            //Inform client of valid_move
            s1.socket.emit('valid_move', {
                box: data.box,
                move: 'O',
            });

            //Inform other client of the move made
            s2.socket.emit('opponent_move', {
                box: data.box,
                move: 'O',
            });

            //Increment move count
            moveCount++;

            //Check if the move made makes player win
            let res = checkWin(board, 'O');

            //Incase of player win
            if (res == 1) {
                s1.socket.emit('win');
                s2.socket.emit('lose');

                //Remove listeners for 'move' event to avoid unwanted behaviour
                RemoveListeners(s1.socket);
                RemoveListeners(s2.socket);
                return 1;
            }
            //Incase of draw
            if (moveCount == 9) {
                s1.socket.emit('draw');
                s2.socket.emit('draw');

                //Remove listeners for 'move' event to avoid unwanted behaviour
                RemoveListeners(s1.socket);
                RemoveListeners(s2.socket);
                return 0;
            }

            //Inform other player client that it is their turn
            s2.socket.emit('turn');
        }
    });

    //Handle move event from s2
    s2.socket.on('move', (data) => {
        if (currentTurn != s2) {
            //Emit invalid_turn if player makes a move but is not their turn
            s2.socket.emit('invalid_turn');
        } else if (board[data.box] != '') {
            //Emit wrong_turn if player makes an illegal move
            s2.socket.emit('wrong_turn');
        } else {
            //Set current turn to next player and update box in case of valid turn and move
            currentTurn = s1;
            board[data.box] = 'X';

            //Inform client of valid_move
            s2.socket.emit('valid_move', {
                box: data.box,
                move: 'X',
            });

            //Inform other client of the move made
            s1.socket.emit('opponent_move', {
                box: data.box,
                move: 'X',
            });

            //Increment move count
            moveCount++;

            //Check if the move made makes player win
            let res = checkWin(board, 'X');

            //Incase of player win
            if (res == 1) {
                s2.socket.emit('win');
                s1.socket.emit('lose');

                //Remove listeners for 'move' event to avoid unwanted behaviour
                RemoveListeners(s1.socket);
                RemoveListeners(s2.socket);
                return -1;
            }

            //Inform other player client that it is their turn
            s1.socket.emit('turn');
        }
    });
}

module.exports = game;
