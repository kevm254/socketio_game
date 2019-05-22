const app = require('express')();
const express = require('express');
const http = require('http').createServer(app);
const path = require('path');

const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
       console.log('user disconnected');
    });

    socket.on('chat:message', (msg) => {
        console.log('thanks for the message: ', msg);
        io.emit('chat:message:return', msg);
    });

    socket.on('button_pressed', (msg) => {
        switch(msg) {
            case 'left':
                io.emit('button_pressed_server', 'left');
                break;
            case 'right':
                io.emit('button_pressed_server', 'right');
                break;
            case 'up':
                io.emit('button_pressed_server', 'up');
                break;
            case 'down':
                io.emit('button_pressed_server', 'down');
                break;
        }

    });
    console.log('a user connected');
});



app.set('port', 3000);
let port = app.get('port');

http.listen(port, () => {
   console.log(`Server running on ${port}`);
});