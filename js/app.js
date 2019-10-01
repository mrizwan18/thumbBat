let toss_val;
let player;
window.onload = function () {
  initApp();
};
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function (user) {
    // [START_EXCLUDE silent]
    // [END_EXCLUDE]
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // [START_EXCLUDE]
      console.log(displayName);
    }
  });
}

function register() {
  let userId = document.getElementById("userId").value;
  let userPass = document.getElementById("userPass").value;
  if (login(userId, userPass))
    console.log("Successful login");

}

function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    signUp(email, password);
  });
}

function signUp(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
  });
}

jQuery(document).ready(function ($) {
  $("#coin").on("click", function () {
    if (document.getElementById("paanch").checked) {
      toss_val = "Paanch";
    }
    else
      toss_val = "Chaand";
    var flipResult = Math.random(0, 1);
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
            player = 1;
            document.getElementById("startGame").style.opacity = 1;
            document.getElementById("startGame").style.pointerEvents = "auto";
          }
          $("#exampleModalLong").modal("show");
        }, 3500);
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
            player = 1;
            document.getElementById("startGame").style.opacity = 1;
            document.getElementById("startGame").style.pointerEvents = "auto";
          }
          $("#exampleModalLong").modal("show");
        }, 3500);
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

function selectToss() {
  if (document.getElementById("bat").checked) {
    player = 2;
  }
  else
    player = 1;
  document.getElementById("startGame").style.opacity = 1;
  document.getElementById("startGame").style.pointerEvents = "auto";
}
function startGame() {
  console.log("OK");
}
