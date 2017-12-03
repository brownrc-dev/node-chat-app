var socket = io();

socket.on('connect', function() {
    console.log("Connected to server");

    /*
    socket.emit('createEmail', {
        to: 'admin@nsreverse.net',
        text: 'this is another test email'
    });
    */
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newEmail', function(emailData) {
    console.log('New email.', emailData);
});

socket.on('newMessage', function(message) {
    // console.log("New Message: ", message);

    var formattedTime = moment(message.createdAt).format('h:mm a');
    var list = $('<li></li>');
    list.text(`[${message.from} (${formattedTime})]: ${message.text}`);

    jQuery('#messages').append(list);
});

/*
socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, function(serverResponse) {
    console.log(serverResponse);
});
*/

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});
