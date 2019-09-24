jQuery(document).ready(function($) {
  $("#coin").on("click", function() {
    var flipResult = Math.random();
    $("#coin").removeClass();
    setTimeout(function() {
      if (flipResult <= 0.5) {
        $("#coin").addClass("heads");
        setTimeout(() => {
          document.getElementById("result").innerHTML = "Chaand";
          $("#exampleModalLong").modal("show");
        }, 2800);
      } else {
        $("#coin").addClass("tails");
        setTimeout(() => {
          document.getElementById("result").innerHTML = "Paanch";
          $("#exampleModalLong").modal("show");
        }, 2800);
      }
    }, 100);
  });
});

function enableToss(){
  console.log("check");
  document.getElementById("coin").style.pointerEvents = "auto";
};

function loadGame() {
  document.getElementsByClassName("load")[0].style.display = "none";
  document.getElementsByClassName("gameContainer")[0].style.display = "block";
}
