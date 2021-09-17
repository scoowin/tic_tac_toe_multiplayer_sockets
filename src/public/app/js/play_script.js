let socket = io();

let Username = $('#username');
let opponent = $('#opponent');
let btnNewGame = $('#btnNewGame');
let btnMove = $('#btnMove');
let move = $('#move');
let searching = $('#searching');
let boxArr = $('.box');

Username.text(window.localStorage.username);

btnNewGame.click(() => {
    searching.text('Searching...');
    socket.emit('search', {
        username: window.localStorage.username,
    });
});

btnMove.click(() => {
    let val = move.val();
    val -= 1;
    socket.emit('move', {
        box: val,
    });
});

socket.on('gameFound', (data) => {
    searching.text('');
    opponent.text(data.opponent);
});
socket.on('turn', () => {
    searching.text('Your turn');
});
socket.on('invalid_turn', () => {
    window.alert('Not your move');
});
socket.on('wrong_turn', () => {
    window.alert('Invalid move');
});
socket.on('valid_move', (data) => {
    boxArr[data.box].innerHTML = data.move;
    searching.text('');
});
socket.on('opponent_move', (data) => {
    boxArr[data.box].innerHTML = data.move;
    searching.text('Your turn');
});
socket.on('win', () => {
    window.alert('You win');
    for (let b of boxArr) {
        b.innerHTML = '';
    }
    opponent.text('');
    searching.text('');
});
socket.on('lose', () => {
    window.alert('You lose');
    for (let b of boxArr) {
        b.innerHTML = '';
    }
    opponent.text('');
    searching.text('');
});
socket.on('draw', () => {
    window.alert('draw');
    for (let b of boxArr) {
        b.innerHTML = '';
    }
    opponent.text('');
    searching.text('');
});
