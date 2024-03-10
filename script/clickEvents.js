var additionPotato = 1;
var isSoundPlaying = false;
var isNotificationOn = false;
var isPotatoCreatable = true;
var isButtonClicked = false;
var content = null;

import { info } from "./info.js";
document.getElementById("info-message").textContent = info;

// Sound Check, so some sounds are not multiplying together
function playSound(soundFile) {
  if (!isSoundPlaying) {
    var audio = new Audio(soundFile);
    audio.volume = 0.4;
    audio.play();
    isSoundPlaying = true;
    audio.onended = function () {
      isSoundPlaying = false;
    };
    setTimeout(() => {
      isSoundPlaying = false;
    }, 1000);
  }
}

// Simple show and hide functions
function showOption() {
  var optionmenu = document.getElementById("options");
  if (optionmenu.classList.contains("show")) {
    optionmenu.classList.toggle("hide");
  } else if (optionmenu.classList.contains("hide")) {
    optionmenu.classList.toggle("show");
  }
}

function showFriend() {
  var friendmenu = document.getElementById("friends");
  if (friendmenu.classList.contains("show")) {
    friendmenu.classList.toggle("hide");
  } else if (friendmenu.classList.contains("hide")) {
    friendmenu.classList.toggle("show");
  }
}

function showLogin() {
  var loginmenu = document.getElementById("loginmenu");
  if (loginmenu.classList.contains("show")) {
    loginmenu.classList.toggle("hide");
  } else if (loginmenu.classList.contains("hide")) {
    loginmenu.classList.toggle("show");
  }
}

// Invite system
// todo: disable after few times, potato needs increasement
function inviteFriend() {
  const buttonContainer = document.querySelectorAll(".inviteBtn");
  buttonSorting();
  if (isButtonClicked) {
    buttonContainer[0].removeEventListener("click", button1ClickHandler);
    buttonContainer[1].removeEventListener("click", button2ClickHandler);
    buttonContainer[2].removeEventListener("click", button3ClickHandler);
  }
}

var button1ClickHandler = function () {
  isButtonClicked = true;
  inviteFriendLoss(50);
};

var button2ClickHandler = function () {
  isButtonClicked = true;
  inviteFriendLoss(100);
};

var button3ClickHandler = function () {
  isButtonClicked = true;
  inviteFriendLoss(150);
};

// Make sure different buttons are recognizable.
function buttonSorting() {
  const buttonContainer = document.querySelectorAll(".inviteBtn");
  buttonContainer[0].addEventListener("click", button1ClickHandler);
  buttonContainer[1].addEventListener("click", button2ClickHandler);
  buttonContainer[2].addEventListener("click", button3ClickHandler);
}

// Invite your friends cost potatoes!
function inviteFriendLoss(potatoes) {
  var clickCountElement = document.getElementById("click-count");
  var currentValue = parseInt(clickCountElement.textContent);
  var leftValue = currentValue - potatoes;
  if (leftValue >= 0) {
    clickCountElement.textContent = leftValue;
    smallNumberGen("-", potatoes);
    content = "Thanks for the potatoes!";
    playSound("./sound/upgrade-sound.mp3");
    additionPotato = additionPotato + 1;
    friendHelp();
    isButtonClicked = false;
  } else {
    content = "Sorry, but you don't have enough potatoes...";
    playSound("./sound/error-sound.mp3");
    isButtonClicked = false;
  }
  isButtonClicked = false;
  sendNotification(content);
}

function friendHelp() {
  const potatoAmount = document.getElementsByClassName("potato-helper");
  var potatoHelperContainer = document.getElementById("potatoHelper-container");
  if (potatoAmount.length < 50 && isPotatoCreatable) {
    // Little potato creating
    var potatoHelper = document.createElement("img");
    potatoHelper.src = "./picture/potato-1.png";
    potatoHelper.classList.add("potato-helper");
    potatoHelper.classList.add("undragable");
    potatoHelperContainer.appendChild(potatoHelper);
    // Generate random coordinates within the desired area
    var areaWidth = 100;
    var areaHeight = 100;
    var randomX = Math.floor(Math.random() * (areaWidth - 10));
    var randomY = Math.floor(Math.random() * (areaHeight - 10));
    potatoHelper.style.left = randomX + "%";
    potatoHelper.style.top = randomY + "%";
  } else if (potatoAmount.length >= 50) {
    isPotatoCreatable = false;
    potatoHelperContainer.innerHTML = ""; // Remove all child elements
    var potatoHelper = document.createElement("img");
    potatoHelper.src = "./picture/potato-1.png";
    potatoHelper.classList.add("potato-helper");
    potatoHelper.classList.add("undragable");
    potatoHelper.style.position = "relative";
    potatoHelperContainer.appendChild(potatoHelper);
  }
  if (!isPotatoCreatable) {
    potatoHelperUpdate();
  }
  // Every 10 sec, your friend is helping you
  setInterval(() => {
    autoIncrement();
  }, 10000);
}

// If you invited too many friends, they'll all come together.
function potatoHelperUpdate() {
  var existingCounter = document.getElementById("potatoHelperCounter");
  var potatoHelperContainer = document.getElementById("potatoHelper-container");
  if (existingCounter) {
    existingCounter.textContent = "X" + (additionPotato - 1);
  } else {
    var potatoHelperCounter = document.createElement("h1");
    potatoHelperCounter.setAttribute("id", "potatoHelperCounter");
    potatoHelperCounter.style.position = "absolute";
    potatoHelperCounter.textContent = "X" + additionPotato;
    potatoHelperContainer.appendChild(potatoHelperCounter);
  }
}
// After inviting your friend, your friend will help you get more potato!
function autoIncrement() {
  var clickCountElement = document.getElementById("click-count");
  var currentValue = parseInt(clickCountElement.textContent);
  var randomNum = Math.floor(Math.random() * 2 + 1);
  clickCountElement.textContent = currentValue + randomNum;
  smallNumberGen("+", randomNum);
}

// Potato click events, including number changes and animation applying
function incrementClickCount() {
  var potatoImage = document.getElementById("potato-image");
  var clickCountElement = document.getElementById("click-count");
  var currentValue = parseInt(clickCountElement.textContent);
  clickCountElement.textContent = currentValue + additionPotato;

  // Pop-Up numbers
  smallNumberGen("+", additionPotato);

  // Apply the animation
  if (!potatoImage.classList.contains("bigger")) {
    potatoImage.classList.add("bigger");
  } else {
    potatoImage.classList.remove("bigger");
    setTimeout(function () {
      potatoImage.classList.add("bigger");
    }, 100);
  }

  // Make some NOISE
  var audio = new Audio("./sound/click-sound.mp3");
  audio.volume = 0.4;
  audio.play();

  setTimeout(function () {
    potatoImage.classList.remove("bigger");
  }, 500);
}

function smallNumberGen(plusorminus, popnum) {
  // Pop-Up number creating
  var smallNumberElement = document.createElement("h1");
  smallNumberElement.classList.add("small-number");
  smallNumberElement.textContent = plusorminus + popnum;
  document.getElementById("counter").appendChild(smallNumberElement);
  // Generate random coordinates within the desired area
  var areaWidth = screen.width;
  var randomX = Math.floor(Math.random() * (areaWidth - 10));
  smallNumberElement.style.left = randomX + "px";

  setTimeout(function () {
    document.getElementById("counter").removeChild(smallNumberElement);
  }, 900);
}

// Disable shaking animation
function noShake() {
  var clicker = document.getElementById("clicker");
  var checkbox = document.getElementById("shake");
  if (!checkbox.checked) {
    clicker.style.animation = "none";
  } else {
    clicker.style.animation = "";
  }
}

// Apply the spin animation
function spin() {
  var potatoImage = document.getElementById("potato-image");
  potatoImage.style.animation = "spin 2s 1 ease-in-out normal";
  var options = document.getElementById("options");
  options.style.display = "none";

  setTimeout(function () {
    playSound("./sound/spin-sound.mp3");
  }, 850);

  setTimeout(function () {
    potatoImage.style.animation = "";
    options.style.display = "";
  }, 2000);
}

// Send notification
function sendNotification(content) {
  if (!isNotificationOn) {
    const notification = document.createElement("div");
    notification.textContent = content;
    notification.classList.add("notification");
    document.body.appendChild(notification);
    isNotificationOn = true;
    setTimeout(() => {
      document.body.removeChild(notification);
      isNotificationOn = false;
    }, 1000);
  }
}

// Cookie Test!!!
function setCookie(userID, potatoAmount) {
  document.cookie = "userNr=" + userID;
  document.cookie = "pAmount=" + potatoAmount;
  document.cookie = "pAddition= " + additionPotato;
}
// Login
function login() {
  var userInput = document.getElementById("userID").value;
  if (document.cookie.match(userInput) && userInput != null) {
    let cookieDecoded = decodeURIComponent(document.cookie);
    let cookieSplited = cookieDecoded.split(";");
    for (let i = 0; i < cookieSplited.length; i++) {
      let cookieReader = cookieSplited[i];
      while (cookieReader.charAt(0) == " ") {
        cookieReader = cookieReader.substring(1);
      }
      if (cookieReader.includes("pAmount")) {
        sendNotification(cookieReader.split("=")[1]);
        setPotatoes(cookieReader.split("=")[1]);
        break; // Exit loop after finding pAmount
      }
    }
  } else {
    sendNotification("Seems like we did not find the cookie! I wonder...");
  }
}

function setPotatoes(potatoAmount) {
  var clickCountElement = document.getElementById("click-count");
  clickCountElement.textContent = potatoAmount;
}

// Register
function register() {
  var randomNr = Math.floor(Math.random() * 1000);
  var potatoAmount = document.getElementById("click-count").innerText;
  setCookie(randomNr, potatoAmount);
  sendNotification(randomNr + " is ur ID! Take care of it!");
}

function removeCookie() {
  document.cookie = "userNr=" + null;
  document.cookie = "pAmount=" + null;
  document.cookie = "pAddition= " + null;
}

// Sheesh, this is the backdoor!
function points(points) {
  var clickCountElement = document.getElementById("click-count");
  var currentValue = parseInt(clickCountElement.textContent);
  clickCountElement.textContent = currentValue + points;
}
