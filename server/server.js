var app = require('express')();
// var fs = require( 'fs' );
// var server = require('https').createServer({
//  key: fs.readFileSync('./server.key'),
//  cert: fs.readFileSync('./server.cert'),
//  requestCert: false,
//  rejectUnauthorized: false
// }, app);
app.get("/", (req, res) => res.send("Hello world!"));

const http = require("http");

const server = http.createServer(app);
var io = require('socket.io')(server);

const PORT = process.env.PORT

server.listen(PORT, () => {
    // task 1: log to show server has started
    console.log(`Server is running on port: ${PORT}`);
  });

io.on('connection', function (socket) {
    socket.on('join', function (data) {
        socket.join(data.roomId);
        // task 1: log to show user has joined a room
        console.log(`User joins room: ${data.roomId}`)
        socket.room = data.roomId;
        const sockets = io.of('/').in().adapter.rooms[data.roomId];
        if(sockets.length===1){
            socket.emit('init')
        }else{
            if (sockets.length===2){
                io.to(data.roomId).emit('ready')
                // task 1: log to show user B has joined room
                console.log(`user B has joined ${data.roomId}. Room is now full`)
            }else{
                socket.room = null
                socket.leave(data.roomId)
                socket.emit('full')
            }
            
        }
    });
    socket.on('signal', (data) => {
        io.to(data.room).emit('desc', data.desc)        
    })
    socket.on('disconnect', () => {
        const roomId = Object.keys(socket.adapter.rooms)[0]
        if (socket.room){
            io.to(socket.room).emit('disconnected')
        }
        
    })
});
