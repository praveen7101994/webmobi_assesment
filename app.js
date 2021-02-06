const express = require('express');
const http = require('http');
let users = require('./public/users');
const port = 6000;
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static('public'))

app.get('/', (req ,res) => {
    res.send('./public')
})

app.get('/users', (req, res) => {
    res.send(users)
})

io.on('connection', (socket) => {
    console.log('New websocket connection');
    socket.broadcast.emit('message', 'A new user has joined...')
    socket.on('sendMessage', (message) => {
        socket.broadcast.emit('message', message)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left')
    })
})

server.listen(port, () => console.log(`Linstening on port ${port}`));