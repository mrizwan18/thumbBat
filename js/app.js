let toss_val;
let player;

function setError(upValue = "") {
  document.getElementById("loginError" + upValue).innerHTML = "Email or Password Invalid. Type email as abc@abc.com"
  document.getElementById("loginError" + upValue).style.display = "block";
  document.getElementById("userPass" + upValue).addEventListener("focus", () => {
    document.getElementById("loginError" + upValue).style.display = "none";
  });
  document.getElementById("userId" + upValue).addEventListener("focus", () => {
    document.getElementById("loginError" + upValue).style.display = "none";
  });
}

function verifyLog(event, input1, input2) {
  if (
    (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input1))
    == -1 ||
    input1 === "" ||
    input2 === ""
  ) {
    setError();
    event.preventDefault();
    return false;
  }
  return true;
}

function verifySign(event, input1, input2, input3) {
  if (
    (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input1))
    == -1 ||
    input1 === "" ||
    input2 === ""
  ) {
    setError("UP");

    event.preventDefault();
    return false;
  }
  return true;
}

document.getElementById("toggleSignUp").addEventListener("click", () => {
  document.getElementById("signUpDiv").style.display = "block";
  document.getElementById("signInDiv").style.display = "none";
});
document.getElementById("toggleSignIn").addEventListener("click", () => {
  document.getElementById("signUpDiv").style.display = "none";
  document.getElementById("signInDiv").style.display = "block";
});


function login(event) {
  let userId = document.getElementById("userId").value;
  let userPass = document.getElementById("userPass").value;
  if (!verifyLog(event, userId, userPass))
    return false;
  return firebase.auth().signInWithEmailAndPassword(userId, userPass).catch(function (error) {
    document.getElementById("loginError").innerHTML = error.message;
    document.getElementById("loginError").style.display = "block";
    document.getElementById("userPass").addEventListener("focus", () => {
      document.getElementById("loginError").style.display = "none";
    });
    document.getElementById("userId").addEventListener("focus", () => {
      document.getElementById("loginError").style.display = "none";
    });
  });
}

function signUp(event) {
  let userId = document.getElementById("userIdUP").value;
  let userPass = document.getElementById("userPassUP").value;
  if (!verifySign(event, userId, userPass))
    return false;
  return firebase.auth().createUserWithEmailAndPassword(userId, userPass).catch(function (error) {
    document.getElementById("loginErrorUP").innerHTML = error.message;
    document.getElementById("loginErrorUP").style.display = "block";
    document.getElementById("userPassUP").addEventListener("focus", () => {
      document.getElementById("loginErrorUP").style.display = "none";
    });
    document.getElementById("userIdUP").addEventListener("focus", () => {
      document.getElementById("loginErrorUP").style.display = "none";
    });
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
