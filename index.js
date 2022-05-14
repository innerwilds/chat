const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)

const socketio = require('socket.io')
const io = new socketio.Server(server)

const {Chat, User} = require('./chat')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    let nick
    
    socket.on('create user', (nickname) => {
        nick = nickname
        User.createUser(nick)
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', { nick, msg })
    })

    socket.on('typing on', () => {
        io.emit('typing on', { nick })
    })

    socket.on('typing off', () => {
        io.emit('typing off', { nick })
    })

    socket.on('online user', () => {
        io.emit('online user', { nick })
    })

    socket.on('offline user', () => {
        io.emit('offline user', { nick })
    })

    socket.on('disconnect', () => {
        io.emit('disconect user', { nick })
        User.removeUser(nick)
    })
})

server.listen(3000, () => {
    console.log('Listening on http://localhost:3000')
})