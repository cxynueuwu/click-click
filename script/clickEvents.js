function incrementClickCount() {
    var potatoImage = document.getElementById("potato-image");
    var clickCountElement = document.getElementById("click-count");
    var currentValue = parseInt(clickCountElement.textContent);
    clickCountElement.textContent = currentValue + 1;

    if (!potatoImage.classList.contains("bigger")) {
        potatoImage.classList.add("bigger");

    } else {
        potatoImage.classList.remove("bigger");
        setTimeout(function () {
            potatoImage.classList.add("bigger");
        }, 100);
    }

    var audio = new Audio('./sound/click-sound.mp3');
    audio.play();

    setTimeout(function () {
        potatoImage.classList.remove("bigger");
    }, 500);
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
        var content = "Thanks for the potatoes!"
        var audio = new Audio('./sound/upgrade-sound.mp3');
        audio.play();
    } else {
        var content = "Sorry, but you don't have enough potato...";
        var audio = new Audio('./sound/error-sound.mp3');
        audio.play();
    }
    const notification = document.createElement('div');
    notification.textContent = content;
    notification.classList.add('notification');
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 1000);

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
        var audio = new Audio('./sound/spin-sound.mp3');
        audio.play();
    }, 850)

    setTimeout(function () {
        potatoImage.style.animation = "";
        options.style.display = ""
    }, 2000)
}