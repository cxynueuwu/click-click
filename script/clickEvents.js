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

function noShack() {
    var potatoImage = document.getElementById("potato-image");
    var checkbox = document.getElementById("no-shack");
    if (checkbox.checked) {
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