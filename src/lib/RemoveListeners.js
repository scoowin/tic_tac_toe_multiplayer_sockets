function RemoveListeners(socket) {
    socket.removeAllListeners('move');
}

module.exports = RemoveListeners;
