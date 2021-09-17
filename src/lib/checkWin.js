function checkWin(board, letter) {
    if (board[0] == letter && board[0] == board[1] && board[0] == board[2]) {
        return 1;
    } else if (
        board[3] == letter &&
        board[3] == board[4] &&
        board[3] == board[5]
    ) {
        return 1;
    } else if (
        board[6] == letter &&
        board[6] == board[7] &&
        board[6] == board[8]
    ) {
        return 1;
    } else if (
        board[0] == letter &&
        board[0] == board[3] &&
        board[0] == board[6]
    ) {
        return 1;
    } else if (
        board[1] == letter &&
        board[1] == board[4] &&
        board[1] == board[7]
    ) {
        return 1;
    } else if (
        board[2] == letter &&
        board[2] == board[5] &&
        board[2] == board[8]
    ) {
        return 1;
    } else if (
        board[0] == letter &&
        board[0] == board[4] &&
        board[0] == board[8]
    ) {
        return 1;
    } else if (
        board[2] == letter &&
        board[2] == board[4] &&
        board[2] == board[6]
    ) {
        return 1;
    } else {
        return 0;
    }
}

module.exports = checkWin;
