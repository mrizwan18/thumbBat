jQuery(document).ready(function ($) {
  $("#coin").on("click", function () {
    var flipResult = Math.random();
    $("#coin").removeClass();
    setTimeout(function () {
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

function enableToss() {
  document.getElementById("coin").style.display = "block";
  let old = document.getElementById("coin").style.animation;
  document.getElementById("coin").style.animation = "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both";
  setTimeout(() => {
    document.getElementById("coin").style.animation=old;
  }, 1000);
};

purify(content, css, options)

function loadGame() {
  document.getElementsByClassName("load")[0].style.display = "none";
  document.getElementsByClassName("toss")[0].style.display = "block";
}
