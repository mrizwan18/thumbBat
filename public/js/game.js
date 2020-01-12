window.onload = function () {
    if (localStorage.getItem("player") == 2)
        document.getElementById("inning").innerHTML = "Batting";
    else
        document.getElementById("inning").innerHTML = "Bowling";
}