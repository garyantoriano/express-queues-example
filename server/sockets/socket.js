const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.next();
        callback(next);
    });

    client.emit('currentState', {
        current: ticketControl.getLastTicket(),
        last4Tickets: ticketControl.getLast4Tickets()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                messae: 'Desk is required'
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desk);

        callback(attendTicket);

        client.broadcast.emit('last4Tickets', {
            current: ticketControl.getLastTicket(),
            last4Tickets: ticketControl.getLast4Tickets()
        });
    });
});