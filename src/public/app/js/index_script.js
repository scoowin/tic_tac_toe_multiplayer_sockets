let btnUsernameEnter = $('#btnUsernameEnter');
let username = $('#username');
btnUsernameEnter.click(() => {
    if (username.val() == '') {
        window.alert('username cannot be empty');
    } else {
        window.localStorage.username = username.val();
        window.open('/play.html', '_self');
    }
});
