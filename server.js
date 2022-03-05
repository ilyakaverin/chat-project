const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server,{cors: {origin: "*"}})
// 1:23:00 timing

const rooms = new Map();

app.get('/rooms', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    response.json(rooms);

}); 

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);
});

server.listen(9999, (error) => {
    if(error) {
        throw new Error(error);
    }
    console.log('Поехали!')
});