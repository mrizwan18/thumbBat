const http = require("http");
const app = require("./app");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

var userList = [];
var userBattingList = [];
var userBowlingList = [];
var sockets = [];
var count = 0;
var io = require("socket.io")(server, {});
io.sockets.on("connection", function (socket) {
  socket.on("user", function (data, fn) {
    sockets.push(socket);
    let user = {};
    user.id = socket.id;
    user.username = data.username;
    socket.username = user.username;
    userList.push(user);
    if (data.status == 2) {
      userBattingList.push(user);
      socket.status = 2;
    } else {
      userBowlingList.push(user);
      socket.status = 1;
    }
    fn(user.id);
  });
  socket.on("disconnect", () => {
    var i = userList
      .map(function (e) {
        return e.id;
      })
      .indexOf(socket.id);
    userList.splice(i, 1);
    if (socket.status == 2) {
      var i = userBattingList
        .map(function (e) {
          return e.id;
        })
        .indexOf(socket.id);
      userBattingList.splice(i, 1);
    } else {
      var i = userBowlingList
        .map(function (e) {
          return e.id;
        })
        .indexOf(socket.id);
      userBowlingList.splice(i, 1);
    }
  });
  socket.on("createRoom", function (user, fn) {
    sockets[sockets.findIndex((x) => x.id == user.id)].join(user.id);
    let opponent = getOpponent(user.status);
    if (opponent !== "Computer") {
      if (
        sockets[sockets.findIndex((x) => x.id == opponent.id)].leave(
          opponent.id
        )
      ) {
        sockets[sockets.findIndex((x) => x.id == opponent.id)].join(user.id);
        fn(opponent.username);
      }
    } else fn("computer");
  });
  socket.on("makePlay", function (user, move) {
    io.sockets.in(user.id).emit("opponentMove", move);
  });

  setInterval(() => {
    socket.emit("userList", {
      userList: userList,
      battingList: userBattingList,
      bowlingList: userBowlingList,
    });
  }, 40);
});
function getOpponent(status) {
  userBattingList.sort(function () {
    return 0.5 - Math.random();
  });
  userBowlingList.sort(function () {
    return 0.5 - Math.random();
  });
  if (status == 2) {
    if (userBowlingList.length > 0) {
      console.log("Inside bowling");
      return userBowlingList.pop();
    } else {
      console.log("Inside bowling computer");
      return "Computer";
    }
  } else {
    if (userBattingList.length > 0) {
      console.log("Inside batting");
      return userBattingList.pop();
    } else {
      console.log("Inside batting computer");
      return "Computer";
    }
  }
}

server.listen(port);
