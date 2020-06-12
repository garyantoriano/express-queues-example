var socket = io();
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblDesk1 = $('#lblDesk1');
var lblDesk2 = $('#lblDesk2');
var lblDesk3 = $('#lblDesk3');
var lblDesk4 = $('#lblDesk4');

var lblTickets = [
  lblTicket1,
  lblTicket2,
  lblTicket3,
  lblTicket4
];

var lblDesks = [
  lblDesk1,
  lblDesk2,
  lblDesk3,
  lblDesk4
];

socket.on('currentState', function (data) {
  updateHtml(data.last4Tickets);
});

socket.on('last4Tickets', function (data) {
  updateHtml(data.last4Tickets);
  var audio = new Audio('audio/new-ticket.mp3');
  audio.play();
});

function updateHtml(last4Tickets) {
  for (var i = 0; i < last4Tickets.length; i++) {
    lblTickets[i].text('Ticket ' + last4Tickets[i].number);
    lblDesks[i].text('Desk ' + last4Tickets[i].desk);
  }
}