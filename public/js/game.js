var userScore = 0, computerScore = 0, count = 0, playersOnline, battingList, bowlingList;
var socket = io();
var currentPlayer = {}
var opponent = {}
currentPlayer.status = localStorage.getItem("player")
currentPlayer.username = localStorage.getItem("username")
window.onload = function () {
    $("#findPlayerModal").modal('show');
    socket.emit('user', this.currentPlayer, function (id) {
        currentPlayer.id = id
    });
    document.getElementById("username").innerHTML = this.currentPlayer.username
    if (currentPlayer.status == 2)
        document.getElementById("inning").innerHTML = "Batting";
    else
        document.getElementById("inning").innerHTML = "Bowling";
    let moves = document.getElementById("moves").querySelectorAll("div");
    moves.forEach(move => {
        move.addEventListener('click', () => {
            makeMove(move.innerHTML);
        })
    });

}

setInterval(() => {
    socket.on('userList', (data) => {
        playersOnline = data.userList
        battingList = data.battingList
        bowlingList = data.bowlingList
        document.getElementById("totalOnline").innerHTML = data.userList.length
    })
}, 1000);


function showPlayers() {
    let playersDiv = document.getElementById('players-body')
    playersDiv.innerHTML = ""
    for (let i = 0; i < playersOnline.length; i++) {
        let p = document.createElement("li")
        p.innerHTML = playersOnline[i].username
        playersDiv.appendChild(p)
    }
}

function makeMove(digit) {
    let cMove = Math.floor(Math.random() * 6) + 1
    let imgU = document.getElementById("userBaari")
    imgU.classList.add("animateImg");
    let imgC = document.getElementById("computerBaari")
    imgC.classList.add("animateImg");
    setTimeout(() => {
        imgU.classList.remove("animateImg");
        imgU.src = 'static/assets/' + digit + 'u.png';
        imgC.classList.remove("animateImg");
        imgC.src = 'static/assets/' + cMove + 'c.png';
        scoreUpdate(cMove, digit);
        gameStatus();
    }, 1000);


}


function gameStatus() {
    let modal = document.getElementById("gameOver-body");
    if (count == 1) {
        if (currentPlayer.status == 2 && (userScore > computerScore)) {
            modal.innerHTML = "<p class='lead'> You scored: " + userScore + "<br> Computer Scored: " + computerScore + "<br>So You Won the game my niBBa. Here is a little gift for you!</p><br><img src='static/assets/won.png'>"
            $("#gameOverModal").modal("show");
        }
        else if (currentPlayer.status == 1 && (userScore < computerScore)) {
            modal.innerHTML = "<p class='lead'> You scored: " + userScore + "<br> Computer Scored: " + computerScore + "<br>So You Lost the game my niBBa. Honestly expected a little better from you. <br>Don't worry tho, I still love you and you are awesome :)</p><br><img src='static/assets/lost.png'>"
            $("#gameOverModal").modal("show");
        }

    }
    else if (count == 2) {
        if (userScore > computerScore) {
            modal.innerHTML = "<p class='lead'> You scored: " + userScore + "<br> Computer Scored: " + computerScore + "<br>So You Won the game my niBBa. Here is a little gift for you!</p><br><img src='static/assets/won.png'>"
            $("#gameOverModal").modal("show");
        }
        else {
            modal.innerHTML = "<p class='lead'> You scored: " + userScore + "<br> Computer Scored: " + computerScore + "<br>So You Lost the game my niBBa. Honestly expected a little better from you. <br>Don't worry tho, I still love you and you are awesome :)</p><br><img src='static/assets/lost.png'>"
            $("#gameOverModal").modal("show");
        }
    }

}

function scoreUpdate(cMove, digit) {
    let userS = document.getElementById("userScore")
    let computerS = document.getElementById("computerScore")
    if (cMove != digit) {
        if (currentPlayer.status == 2) {
            userScore += parseInt(digit)
            userS.innerHTML = userScore
        }
        else {
            computerScore += cMove
            computerS.innerHTML = computerScore
        }
    }
    else {
        count++;
        if (currentPlayer.status == 1 && count < 2) {
            document.getElementById("inning").innerHTML = "Batting";
            inningsOver();
            currentPlayer.status = 2;
        }
        else if (currentPlayer.status == 2 && count < 2) {
            document.getElementById("inning").innerHTML = "Bowling";
            inningsOver();
            currentPlayer.status = 1;
        }
    }
}


function inningsOver() {
    let modal = document.getElementById("innings-body");
    if (count < 2) {
        if (currentPlayer.status == 2) {
            modal.innerHTML = "<h3>Your innings is over. You scored: " + userScore + "<br> Now Computer will bat.</h3>"
        }
        else
            modal.innerHTML = "<h3>Computer's innings is over. It scored: " + computerScore + "<br> Now You will bat.</h3>"
    }
    $("#inningsOverModal").modal("show");
}

function findPlayer() {
    document.getElementById('findPlayer').style.display = "none"
    document.getElementById('gooey').style.display = "block"
    socket.emit('createRoom', currentPlayer, function (fn) {
        document.getElementById("opponent").innerHTML = fn
        document.getElementById("currentUser").innerHTML = currentPlayer.username
        document.getElementById('gooey').style.display = "none"
        $("#findPlayerModal").modal('hide');
    });
}