const http = require('http')
const app = require('./app')

const port = process.env.PORT || 3000;

const server = http.createServer(app);

var io = require('socket.io')(server, {});
io.sockets.on('connection', function (socket) {
    socket.on('user', (data) => {
        console.log(data.username + " Connected")
    })
})


server.listen(port);