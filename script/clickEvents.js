var additionPotato = 1;
var isSoundPlaying = false;

function playSound(soundFile) {
    if (!isSoundPlaying) {
        var audio = new Audio(soundFile);
        audio.volume = 0.4;
        audio.play();
        isSoundPlaying = true;
        audio.onended = function () {
            isSoundPlaying = false;
        };
    }
}

function showOption() {
    var optionmenu = document.getElementById("options");
    if (optionmenu.classList.contains("show")) {
        optionmenu.classList.replace("show", "hide");
    } else if (optionmenu.classList.contains("hide")) {
        optionmenu.classList.replace("hide", "show");
    }
}

function showFriend() {
    var friendmenu = document.getElementById("friends");
    if (friendmenu.classList.contains("show")) {
        friendmenu.classList.replace("show", "hide");
    } else if (friendmenu.classList.contains("hide")) {
        friendmenu.classList.replace("hide", "show");
    }
}

function inviteFriend(potatoes) {
    var clickCountElement = document.getElementById("click-count");
    var currentValue = parseInt(clickCountElement.textContent);
    var leftValue = currentValue - potatoes;
    if (leftValue >= 0) {
        clickCountElement.textContent = leftValue;
        smallNumberGen("-", potatoes);
        var content = "Thanks for the potatoes!";
        playSound('./sound/upgrade-sound.mp3');
        additionPotato = additionPotato + 1;
    } else {
        var content = "Sorry, but you don't have enough potato...";
        playSound('./sound/error-sound.mp3');
    }
    const notification = document.createElement('div');
    notification.textContent = content;
    notification.classList.add('notification');
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 1000);
}

function incrementClickCount() {
    var potatoImage = document.getElementById("potato-image");
    var clickCountElement = document.getElementById("click-count");
    var currentValue = parseInt(clickCountElement.textContent);
    clickCountElement.textContent = currentValue + additionPotato;

    smallNumberGen("+", additionPotato);

    if (!potatoImage.classList.contains("bigger")) {
        potatoImage.classList.add("bigger");
    } else {
        potatoImage.classList.remove("bigger");
        setTimeout(function () {
            potatoImage.classList.add("bigger");
        }, 100);
    }

    var audio = new Audio('./sound/click-sound.mp3');
    audio.volume = 0.4;
    audio.play();

    setTimeout(function () {
        potatoImage.classList.remove("bigger");
    }, 500);
}

function smallNumberGen(plusorminus ,popnum) {
    // Pop-Up numbers
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

function noShack() {
    var potatoImage = document.getElementById("potato-image");
    var checkbox = document.getElementById("shack");
    if (!checkbox.checked) {
        potatoImage.style.animation = "none";
    } else {
        potatoImage.style.animation = "";
    }
}

function spin() {
    var potatoImage = document.getElementById("potato-image");
    potatoImage.style.animation = "spin 2s 1 ease-in-out normal";
    var options = document.getElementById("options");
    options.style.display = "none";

    setTimeout(function () {
        playSound('./sound/spin-sound.mp3');
    }, 850);

    setTimeout(function () {
        potatoImage.style.animation = "";
        options.style.display = "";
    }, 2000);
}
