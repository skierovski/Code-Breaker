let colors = [
    "color-0",
    "color-1",
    "color-2",
    "color-3",
    "color-4",
    "color-5",
    "color-6",
    "color-7",
    "color-8",
    "color-9",
];
let round = 1;
let time = 0;
let randomColors = [];
let repeat_color = 0;
var count = 0;
let score = 0;
let score_possible = [0, 0, 0, 0, 0];
let timeOption = 0;
let setTime = 1 * 60;
let roundTime = setTime;
let refreshIntervalId = setInterval(startTimer, 1000);
const mainBody = document.getElementById("body");
const logoTemplate = document.getElementById("logo-template");

function clearBody() {
    const parent = mainBody;
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}

function createAndAppendElement(elementClass, parent) {
    const element = document.createElement("div");
    element.classList.add(elementClass);
    parent.appendChild(element);
    return element;
}

function crateTable() {
    const logo = logoTemplate.content.cloneNode(true);
    mainBody.appendChild(logo);

    createAndAppendElement('game-table', mainBody);
    // const gameTableFirstRow = document.getElementsByClassName("game-table")[0];
    const gameTableFirstRow = document.querySelector('.game-table');

    const roundNumber = createAndAppendElement('round-number', gameTableFirstRow);
    createAndAppendElement('game-panel', gameTableFirstRow);
    createAndAppendElement('color_panel', gameTableFirstRow);

    //TODO move below loops to separate function
    for (let i = 1; i < 13; i++) {
        const number = document.createElement("div");
        number.classList.add("number");
        number.innerHTML = i;
        roundNumber.appendChild(number);
    }

    for (let i = 0; i < 12; i++) {
        const round = document.createElement("div");
        round.classList.add("round");
        round.innerHTML =
            '<div class="user-panel"><div class="user-option"></div><div class="user-option"></div><div class="user-option"></div><div class="user-option"></div><div class="user-option"></div></div><div class="score-panel"><div class="score-option"></div><div class="score-option"></div><div class="score-option"></div><div class="score-option"></div><div class="score-option"></div></div>';
        document.getElementsByClassName("game-panel")[0].appendChild(round);
    }

    for (i = 0; i < 10; i++) {
        const color = document.createElement("div");
        color.classList.add("color");
        document.getElementsByClassName("color_panel")[0].appendChild(color);
    }

    const timePanel = document.createElement("div");
    timePanel.classList.add("time-panel");
    mainBody.appendChild(timePanel);

    const controlPanel = document.createElement("div");
    controlPanel.classList.add("control-panel");
    controlPanel.innerHTML =
        '<button onclick="go_round()">Next Round</button><button onclick="startWindows()">Exit Game</button>';
    mainBody.appendChild(controlPanel);
}

function resetLogo() {
    //TODO create second template for logo without timer
    const logo = document.createElement("div");
    logo.classList.add("logo-panel");
    logo.innerHTML =
        '<p class="logo">Code Breaking</p><p class="logo-text">Try to escape</p>';
    mainBody.appendChild(logo);
}

function startWindows() {
    clearBody();
    resetLogo();

    const menu = document.createElement("div");
    menu.classList.add("menu");
    menu.innerHTML =
        '<button onclick="initCodeBreaking()">New Game</button></br></br>' +
        '<button onclick="howToPlayWindows()">How to Play</button></br></br>' +
        '<button onclick="settingsWindows()">Settings</button></br></br>' +
        '<button onclick="highscores()">Highscores</button></br></br>' +
        '<button onclick="creditsWindows()">Credits</button></br></br>';
    mainBody.appendChild(menu);
}

function winWindows() {
    clearBody();
    resetLogo();

    const win = document.createElement("div");
    win.classList.add("win");
    win.innerHTML =
        '<p class="win-text">Congratulations!! You escaped.</p><div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/d2Z8AaYZyUC5K2fS" width="470" height="280" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>';
    mainBody.appendChild(win);

    const controlPanel = document.createElement("div");
    controlPanel.classList.add("control-panel");
    controlPanel.innerHTML =
        '<button onclick="startWindows()">Back to menu</button>';
    mainBody.appendChild(controlPanel);
}

function loseWindows() {
    clearBody();
    resetLogo();

    const win = document.createElement("div");
    win.classList.add("win");
    win.innerHTML =
        '<p class="win-text">Trolololo!! You have lost.</p><div style="width:100%;height:0;padding-bottom:43%;position:relative;"><iframe src="https://giphy.com/embed/pdAGJ1CzyNf6o" width="480" height="205" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>';
    mainBody.appendChild(win);

    const controlPanel = document.createElement("div");
    controlPanel.classList.add("control-panel");
    controlPanel.innerHTML =
        '<button onclick="startWindows()">Back to menu</button>';
    mainBody.appendChild(controlPanel);
}

function settingsWindows() {
    clearBody();
    resetLogo();

    const play = document.createElement("div");
    play.classList.add("win");
    play.innerHTML =
        '<p class="win-text" style="display:inline">Music : </p>' +
        '<button id="playPauseBTN" onclick="playPause()">Turn on/off</button><br>' +
        '<p class="win-text" style="display:inline">The possibility of repeating the color : </p><button id="possible-repeating" onclick="changeRepeatColor()">No</button><br>' +
        '<p class="win-text" style="display:inline">Set round time : </p><button id="time-option" onclick="changeTime()">1:00</button>';
    mainBody.appendChild(play);

    const controlPanel = document.createElement("div");
    controlPanel.classList.add("control-panel");
    controlPanel.innerHTML =
        '<button onclick="startWindows()">Back to menu</button>';
    mainBody.appendChild(controlPanel);

    el = document.getElementById("possible-repeating");
    el.innerText = repeat_color == 0 ? "No" : "Yes";

    playPauseBTN = document.getElementById("playPauseBTN");
    // playPauseBTN.innerHTML = count == 0 ? "Turn off" : "Turn on";
    playPauseBTN.innerHTML = `Turn ${count == 0 ? "off" : "on"}`;

    timeBTM = document.getElementById("time-option");
    if (timeOption == 0) {
        timeBTM.innerHTML = "1:00";
    } else if (timeOption == 1) {
        timeBTM.innerHTML = "0:45";
    } else {
        timeBTM.innerHTML = "0:30";
    }
}

function creditsWindows() {
    clearBody();
    const logo = document.createElement("div");
    logo.classList.add("logo-panel");
    logo.innerHTML =
        '<p class="logo">Code Breaking</p><p class="logo-text">Try to escape</p>';
    mainBody.appendChild(logo);

    const play = document.createElement("div");
    play.classList.add("howPlay");
    play.innerHTML =
        '<p class="how-to-play" style="display:inline">Team APA<br><br>' +
        "Alex Andrzejewicz<br><br>" +
        "Patryk Skierkowski<br><br>" +
        "Adrian Rymaszewski<br><br>" +
        "Sources :<br>" +
        'Music from <a href="https://pixabay.com/pl/music/gowny-tytu-epic-dramatic-action-trailer-99525/">Pixabay</a><br>' +
        'Gif from <a href="https://giphy.com">Giphy</a><br><br>' +
        "Thank you for your attention<br></p>";
    mainBody.appendChild(play);

    const controlPanel = document.createElement("div");
    controlPanel.classList.add("control-panel");
    controlPanel.innerHTML =
        '<button onclick="startWindows()">Back to menu</button>';
    mainBody.appendChild(controlPanel);
}

function howToPlayWindows() {
    clearBody();
    const logo = document.createElement("div");
    logo.classList.add("logo-panel");
    logo.innerHTML =
        '<p class="logo">Code Breaking</p><p class="logo-text">Try to escape</p>';
    mainBody.appendChild(logo);

    //TODO move to html and set display to none, in this function change it to display block
    const play = document.createElement("div");
    play.classList.add("howPlay");
    play.innerHTML =
        '<img src="image/howtoplay.JPG"><br>' +
        '<p class="how-to-play" style="display:inline">1. The game is based on guessing the code by the player.<br>' +
        "2. The code itself consists of five out of ten randomly selected colors.<br>" +
        "3. Player, wishing to guess the code, places the colors on the board in the indicated places.<br>" +
        "4. If he does not exceed the predetermined duration of the round, he can check his guess, but if the allotted time elapses, the change of round will be induced by itself.<br>" +
        '5. As you can see in the illustration "A", in the first round only the outer colors were in the code, but they were not in the right places (green dot), while in the third round, the middle square was guessed, the color and place match (black dot).<br>' +
        "6. The player wins the game if he can guess the code in more or less twelve rounds.<br>" +
        "7. A difficulty that can also be set is the possibility of repeating colors in the code, which is unchecked by default.<br></p>";
    mainBody.appendChild(play);

    const controlPanel = document.createElement("div");
    controlPanel.classList.add("control-panel");
    controlPanel.innerHTML =
        '<button onclick="startWindows()">Back to menu</button>';
    mainBody.appendChild(controlPanel);
}

//TODO camelCase
function go_round() {
    roundTime = setTime;
    startTimer();
    removeRoundZones(round);
    roundCheck();
    checkWin();
    round = round + 1;
    if (round == 13) {
        loseWindows();
    }
    initRoundZones(round);
}

function initCodeBreaking() {
    round = 1;
    time = 0;
    score = 0;
    score_possible = [0, 0, 0, 0, 0];
    clearBody();
    crateTable();
    initColors();
    roundNumber();
    initRoundZones(round);
    roundTime = setTime;
    startTimer();
    randomColors = randomColor();
}

function randomColor() {
    var CodeColor = [];

    for (var i = 0; i < 5; i++) {
        var idx = Math.floor(Math.random() * colors.length);
        CodeColor.push(colors[idx]);
        if (repeat_color == 0) {
            colors.splice(idx, 1);
        }
    }
    console.log(CodeColor);
    return CodeColor;
}

function roundCheck() {
    round_zones = document.querySelectorAll(".round");
    round_zone = round_zones[round - 1];
    let panels = round_zone.children;
    let user_panel = panels[0].children;
    let score_panel = panels[1].children;
    let colorToCheck;
    let roundCorrect = 1;
    const el = document.getElementById("user-score");

    for (let i = 0; i < user_panel.length; i++) {
        colorToCheck = user_panel[i].getAttribute("class").slice(12, 19);

        if (colorToCheck == randomColors[i]) {
            score_panel[i].setAttribute("class", "correct");
            if (score_possible[i] == 0) {
                score_possible[i] = 1;
                score = score + (200 - 10 * (round - 1)) * roundCorrect;
                roundCorrect += 1;
                el.innerText = score;
            }
        } else {
            for (let j = 0; j < randomColors.length; j++) {
                if (randomColors[j] == colorToCheck && score_possible[j] == 0) {
                    score_panel[i].setAttribute("class", "posible");
                }
            }
        }
    }
}

function checkWin() {
    round_zones = document.querySelectorAll(".round");
    round_zone = round_zones[round - 1];
    let panels = round_zone.children;
    let score_panel = panels[1].children;
    let score_point = 0;
    for (i = 0; i < 5; i++) {
        if (score_panel[i].getAttribute("class") == "correct") {
            score_point += 1;
            console.log(score_point);
        }
    }
    if (score_point == 5) {
        winWindows();
    }
}

function initColors() {
    let all_colors = document.querySelectorAll(".color");
    let initialId = 0;
    all_colors.forEach(function(element) {
        element.setAttribute("draggable", true);

        element.addEventListener("dragstart", handleDragStart);
        element.addEventListener("dragend", handleDragEnd);

        element.id = "color-" + initialId++;
        element.textContent = initialId - 1;
    });
}

function roundNumber() {
    let all_colors = document.querySelectorAll(".round");
    let initialId = 1;
    all_colors.forEach(function(element) {
        element.id = initialId++;
    });
}

function initRoundZones(round) {
    const allRoundZones = document.querySelectorAll(".user-panel");

    allRoundZones.forEach(function(element) {
        let all_kids = element.children;
        let parent_id = element.parentElement.getAttribute("id");

        for (let i = 0; i < all_kids.length; i++) {
            let targetElement = all_kids[i];
            if (parent_id == round) {
                element.setAttribute("id", "active");
                targetElement.addEventListener("drop", handleDrop);
                targetElement.addEventListener("dragover", handleDragOver);
                targetElement.addEventListener("dragenter", handleDragEnter);
                targetElement.addEventListener("dragleave", handleDragLeave);
            }
        }
    });
}

//TODO same as above
function removeRoundZones(round) {
    all_roundZones = document
        .querySelectorAll(".user-panel")
        .forEach(function(element) {
            let all_kids = element.children;
            for (let i = 0; i < all_kids.length; i++) {
                let targetElement = all_kids[i];
                let parent_id = element.parentElement.getAttribute("id");
                if (parent_id == round) {
                    element.setAttribute("id", "deactive");
                    targetElement.removeEventListener("drop", handleDrop);
                    targetElement.removeEventListener("dragover", handleDragOver);
                    targetElement.removeEventListener("dragenter", handleDragEnter);
                    targetElement.removeEventListener("dragleave", handleDragLeave);
                }
            }
        });
}

function handleDragEnter(ev) {
    //ev.target.classList.add("card-slot-highlighted-super");
}

function handleDragLeave(ev) {
    //ev.target.classList.remove("card-slot-highlighted-super");
}

function handleDrop(ev) {
    if (ev.target.nodeName == "IMG") {
        return false;
    }
    if (ev.target.nodeName == "DIV" && ev.target.hasChildNodes()) {
        return false;
    }
    //const id = ev.dataTransfer.getData("text/plain");
    ev.preventDefault();
    last_class = ev.target.getAttribute("class").slice(0, 11);
    ev.target.setAttribute(
        "class",
        last_class + " " + ev.dataTransfer.getData("text/plain")
    );
    //ev.target.setAttribute("ID",ev.dataTransfer.getData("text/plain"));
}

function handleDragOver(ev) {
    ev.preventDefault();
    //ev.target.setAttribute("id", "over");
}

function handleDragStart(ev) {
    console.debug(ev.target.id);
    ev.dataTransfer.setData("text/plain", ev.target.id);
    //ev.target.firstElementChild.classList.add("highlight")
    //toggleCardSlotsHighlight();
}

function handleDragEnd(ev) {
    //ev.target.firstElementChild.classList.remove("highlight")
    //toggleCardSlotsHighlight(false);
    //let superHighlighted = document.querySelector('.card-slot-highlighted-super');
    //if(superHighlighted){
    //     superHighlighted.classList.remove('card-slot-highlighted-super');
    // }
    //ev.preventDefault();
    //ev.target.setAttribute("sss", "test");
}

startWindows();

function playPause() {
    var audio = document.getElementById("audio");
    audio.volume = 0.1;
    audio.loop = "True";
    var playPauseBTN = document.getElementById("playPauseBTN");
    if (count == 0) {
        count = 1;
        audio.play();
        playPauseBTN.innerHTML = "Turn on";
    } else {
        count = 0;
        audio.pause();
        playPauseBTN.innerHTML = "Turn off";
    }
}

function changeRepeatColor() {
    const el = document.getElementById("possible-repeating");

    if (repeat_color == 0) {
        repeat_color = 1;
        el.innerText = "Yes";
    } else {
        repeat_color = 0;
        el.innerText = "No";
    }
}

function startTimer() {
    const minutes = Math.floor(roundTime / 60); // rounds a number DOWN to the nearest integer
    let seconds = roundTime % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const contdownEl = document.getElementById("time-panel");

    //TODO 
    if (!contdownEl) {
        return;
    }

    contdownEl.innerHTML = `${minutes}:${seconds}`;
    roundTime--;
    if (roundTime < 0) {
        go_round();
    }
}

function changeTime() {
    const el = document.getElementById("time-option");

    if (timeOption == 0) {
        timeOption = 1;
        el.innerText = "0:45";
        setTime = 0.75 * 60;
    } else if (timeOption == 1) {
        timeOption = 2;
        el.innerText = "0:30";
        setTime = 0.5 * 60;
    } else {
        timeOption = 0;
        el.innerText = "1:00";
        setTime = 1 * 60;
    }
}