const http = require('http')
const app = require('./app')

const port = process.env.PORT || 3000;

const server = http.createServer(app);

var userList = []
var userBattingList = []
var userBowlingList = []
var io = require('socket.io')(server, {});
io.sockets.on('connection', function (socket) {

    socket.on('user', (data) => {
        let user = {}
        user.id = socket.id
        user.username = data.user.username
        socket.username = user.username
        userList.push(user)
        if (data.user.status == 2) {
            userBattingList.push(user)
            socket.status = 2
        }
        else {
            userBowlingList.push(user)
            socket.status = 1
        }
    })
    socket.on('disconnect', () => {
        var i = userList.map(function (e) { return e.id; }).indexOf(socket.id);
        userList.splice(i, 1);
        if (socket.status == 2) {
            var i = userBattingList.map(function (e) { return e.id; }).indexOf(socket.id);
            userBattingList.splice(i, 1);
        }
        else {
            var i = userBowlingList.map(function (e) { return e.id; }).indexOf(socket.id);
            userBowlingList.splice(i, 1);
        }
    })
    setInterval(() => {
        socket.emit('userList', {
            userList: userList,
            battingList: userBattingList,
            bowlingList: userBowlingList
        })
    }, 40);
})



server.listen(port);