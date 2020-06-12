var label = $('#lblNewTicket');

// Command to link the connection
var socket = io();

socket.on('connect', function () {
  console.log('Connected with the server!');
});

// On => to hear information
socket.on('disconnect', function () {
  console.log('Server connection lost');
});

socket.on('currentState', function (data) {
  label.text(data.current);
});

$('button').on('click', function () {
  socket.emit('nextTicket', null, (nextTicket) => {
    label.text(nextTicket);
  });
});