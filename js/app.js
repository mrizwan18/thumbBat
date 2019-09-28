let toss_val;
let player;


jQuery(document).ready(function ($) {
  $("#coin").on("click", function () {
    if (document.getElementById("paanch").checked) {
      toss_val = "Paanch";
    }
    else
      toss_val = "Chaand";
    var flipResult = Math.random(0,1);
    console.log(flipResult);
    $("#coin").removeClass();
    setTimeout(function () {
      if (flipResult <= 0.5) {
        $("#coin").addClass("heads");
        setTimeout(() => {
          if (toss_val === "Chaand") {
            document.getElementsByClassName("selectInnings")[0].style.display = "block";
            document.getElementById("result").innerHTML = "You Won the toss";
          }
          else {
            document.getElementsByClassName("selectInnings")[0].style.display = "none";
            document.getElementById("result").innerHTML = "You Lost the toss";
          }
          $("#exampleModalLong").modal("show");
        }, 2800);
      } else {
        $("#coin").addClass("tails");
        setTimeout(() => {
          if (toss_val === "Paanch") {
            document.getElementsByClassName("selectInnings")[0].style.display = "block";
            document.getElementById("result").innerHTML = "You Won the toss";
          }
          else {
            document.getElementsByClassName("selectInnings")[0].style.display = "none";
            document.getElementById("result").innerHTML = "You Lost the toss";
          }
          $("#exampleModalLong").modal("show");
        }, 2800);
      }
    }, 100);
  });
});

function enableToss() {
  document.getElementById("coin").style.display = "block";
  let old = document.getElementById("coin").style.animation;
  document.getElementById("coin").style.animation = "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both";
  setTimeout(() => {
    document.getElementById("coin").style.animation = old;
  }, 1000);
};
function loadGame() {
  document.getElementsByClassName("load")[0].style.display = "none";
  document.getElementsByClassName("toss")[0].style.display = "block";
}
