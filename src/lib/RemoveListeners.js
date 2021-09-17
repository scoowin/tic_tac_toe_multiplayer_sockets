//Remove listeners as part of cleanup after game is finished
function RemoveListeners(socket) {
    socket.removeAllListeners('move');
}

module.exports = RemoveListeners;
