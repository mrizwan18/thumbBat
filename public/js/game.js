var userScore = 0, computerScore = 0, count = 0, playersOnline, battingList, bowlingList;
var socket = io();
var currentPlayer = localStorage.getItem("player")
var userName = localStorage.getItem("username")
window.onload = function () {
    let user = {}
    user.username = localStorage.getItem("username")
    user.status = currentPlayer
    socket.emit("user", {
        user: user
    })
    document.getElementById("username").innerHTML = this.userName
    if (currentPlayer == 2)
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
        if (currentPlayer == 2 && (userScore > computerScore)) {
            modal.innerHTML = "<p class='lead'> You scored: " + userScore + "<br> Computer Scored: " + computerScore + "<br>So You Won the game my niBBa. Here is a little gift for you!</p><br><img src='static/assets/won.png'>"
            $("#gameOverModal").modal("show");
        }
        else if (currentPlayer == 1 && (userScore < computerScore)) {
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
        if (currentPlayer == 2) {
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
        if (currentPlayer == 1 && count < 2) {
            document.getElementById("inning").innerHTML = "Batting";
            inningsOver();
            currentPlayer = 2;
        }
        else if (currentPlayer == 2 && count < 2) {
            document.getElementById("inning").innerHTML = "Bowling";
            inningsOver();
            currentPlayer = 1;
        }
    }
}


function inningsOver() {
    let modal = document.getElementById("innings-body");
    if (count < 2) {
        if (currentPlayer == 2) {
            modal.innerHTML = "<h3>Your innings is over. You scored: " + userScore + "<br> Now Computer will bat.</h3>"
        }
        else
            modal.innerHTML = "<h3>Computer's innings is over. It scored: " + computerScore + "<br> Now You will bat.</h3>"
    }
    $("#inningsOverModal").modal("show");
}

