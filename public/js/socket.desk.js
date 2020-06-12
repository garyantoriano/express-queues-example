// Command to link the connection
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
  widnows.location = 'index.html';
  throw new Error('Desk is required');
}

var desk = searchParams.get('desk');
var labelCurrentTicket = $('small');

$('h1').text('Desk: ' + desk);

$('button').on('click', function () {
  socket.emit('attendTicket', { desk: desk }, function (response) {
    if (response === 'There are no tickets.') {
      alert(response);
      labelCurrentTicket.text(response);

      return;
    }

    labelCurrentTicket.text('Ticket ' + response.number);
  });
});