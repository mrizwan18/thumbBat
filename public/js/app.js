let toss_val;
let username = "Joemama";

jQuery(document).ready(function ($) {
  $("#coin").on("click", function () {
    if (document.getElementById("paanch").checked) {
      toss_val = "Paanch";
    } else toss_val = "Chaand";
    var flipResult = Math.random(0, 1);
    $("#coin").removeClass();
    setTimeout(function () {
      if (flipResult <= 0.5) {
        $("#coin").addClass("heads");
        setTimeout(() => {
          if (toss_val === "Chaand") {
            document.getElementsByClassName("selectInnings")[0].style.display =
              "block";
            document.getElementById("result").innerHTML = "You Won the toss";
          } else {
            document.getElementsByClassName("selectInnings")[0].style.display =
              "none";
            document.getElementById("result").innerHTML =
              "You Lost the toss<br> Other Player is batting first";
            localStorage.setItem("player", 1);
            document.getElementById("startGame").style.opacity = 1;
            document.getElementById("startGame").style.pointerEvents = "auto";
          }
          $("#selectionModal").modal("show");
        }, 3500);
      } else {
        $("#coin").addClass("tails");
        setTimeout(() => {
          if (toss_val === "Paanch") {
            document.getElementsByClassName("selectInnings")[0].style.display =
              "block";
            document.getElementById("result").innerHTML = "You Won the toss";
          } else {
            document.getElementsByClassName("selectInnings")[0].style.display =
              "none";
            document.getElementById("result").innerHTML =
              "You Lost the toss<br> Computer is batting first";
            localStorage.setItem("player", 1);
            document.getElementById("startGame").style.opacity = 1;
            document.getElementById("startGame").style.pointerEvents = "auto";
          }
          $("#selectionModal").modal("show");
        }, 3500);
      }
    }, 100);
  });
});

function enableToss() {
  document.getElementById("coin").style.display = "block";
  let old = document.getElementById("coin").style.animation;
  document.getElementById("coin").style.animation =
    "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both";
  setTimeout(() => {
    document.getElementById("coin").style.animation = old;
  }, 1000);
}

function selectToss() {
  if (document.getElementById("bat").checked) {
    localStorage.setItem("player", 2);
  } else localStorage.setItem("player", 1);
  document.getElementById("startGame").style.opacity = 1;
  document.getElementById("startGame").style.pointerEvents = "auto";
}

$("#userBtn").click(function () {
  if (document.getElementById("username").value !== "")
    username = document.getElementById("username").value;
  $.post("/addUser", {
      user: username
    },
    function (data, status) {
      console.log(data, status)
      if (status == "200") {
        $("#dbMessage").html("User successfully created.");
        $("#messageALert").addClass("show");
        setTimeout(function () {
          $("#usernameModal").modal("hide");
        }, 2000);
        localStorage.setItem("username", username);
      } else {
        $("#dbMessage").html("Username " + username + " already exists, try another");
        $("#messageALert").addClass("show");
      }
    });

});