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
let repeatColor = 0;
var count = 0;
let score = 0;
let scorePossible = [0, 0, 0, 0, 0];
let timeOption = 0;
let setTime = 1 * 60;
let roundTime = setTime;
let refreshIntervalId = setInterval(startTimer, 1000);
const mainBody = document.getElementById("conteiner");
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

function createRow(roundNumber) {
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
    document.querySelector(".game-panel").appendChild(round);
  }

  for (i = 0; i < 10; i++) {
    const color = document.createElement("div");
    color.classList.add("color");
    document.querySelector(".color_panel").appendChild(color);
  }
}

function crateTable() {
  const logo = logoTemplate.content.cloneNode(true);
  mainBody.appendChild(logo);

  createAndAppendElement("game-table", mainBody);
  const gameTableFirstRow = document.querySelector(".game-table");

  const roundNumber = createAndAppendElement("round-number", gameTableFirstRow);
  createAndAppendElement("game-panel", gameTableFirstRow);
  createAndAppendElement("color_panel", gameTableFirstRow);

  createRow(roundNumber);

  const timePanel = document.createElement("div");
  timePanel.classList.add("time-panel");
  mainBody.appendChild(timePanel);

  const controlPanel = document.createElement("div");
  controlPanel.classList.add("control-panel");
  controlPanel.innerHTML =
    '<button onclick="goRound()">Next Round</button><button onclick="startWindows()">Exit Game</button>';
  mainBody.appendChild(controlPanel);
}

function resetLogo() {
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
  el.innerText = repeatColor == 0 ? "No" : "Yes";

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

function goRound() {
  roundTime = setTime;
  startTimer();
  removeRound();
  roundCheck();
  checkWin();
  round = round + 1;
  if (round == 13) {
    loseWindows();
  }
  initRound();
}

function initCodeBreaking() {
  round = 1;
  time = 0;
  score = 0;
  scorePossible = [0, 0, 0, 0, 0];
  clearBody();
  crateTable();
  initColors();
  roundNumber();
  initRound();
  roundTime = setTime;
  startTimer();
  randomColors = randomColor();
}

function randomColor() {
  var CodeColor = [];

  for (var i = 0; i < 5; i++) {
    var idx = Math.floor(Math.random() * colors.length);
    CodeColor.push(colors[idx]);
    if (repeatColor == 0) {
      colors.splice(idx, 1);
    }
  }
  console.log(CodeColor);
  return CodeColor;
}

function roundCheck() {
  roundZones = document.querySelectorAll(".round");
  roundZone = roundZones[round - 1];
  let panels = roundZone.children;
  let userPanel = panels[0].children;
  let scorePanel = panels[1].children;
  let colorToCheck;
  let roundCorrect = 1;
  const el = document.getElementById("user-score");

  for (let i = 0; i < userPanel.length; i++) {
    colorToCheck = userPanel[i].getAttribute("class").slice(12, 19);

    if (colorToCheck == randomColors[i]) {
      scorePanel[i].setAttribute("class", "correct");
      if (scorePossible[i] == 0) {
        scorePossible[i] = 1;
        score = score + (200 - 10 * (round - 1)) * roundCorrect;
        roundCorrect += 1;
        el.innerText = score;
      }
    } else {
      for (let j = 0; j < randomColors.length; j++) {
        if (randomColors[j] == colorToCheck && scorePossible[j] == 0) {
          scorePanel[i].setAttribute("class", "posible");
        }
      }
    }
  }
}

function checkWin() {
  roundZones = document.querySelectorAll(".round");
  roundZone = roundZones[round - 1];
  let panels = roundZone.children;
  let scorePanel = panels[1].children;
  let scorePoint = 0;
  for (i = 0; i < 5; i++) {
    if (scorePanel[i].getAttribute("class") == "correct") {
      scorePoint += 1;
      console.log(scorePoint);
    }
  }
  if (scorePoint == 5) {
    winWindows();
  }
}

function initColors() {
  let allColors = document.querySelectorAll(".color");
  let initialId = 0;
  allColors.forEach(function (element) {
    element.setAttribute("draggable", true);

    element.addEventListener("dragstart", handleDragStart);

    element.id = "color-" + initialId++;
    element.textContent = initialId - 1;
  });
}

function roundNumber() {
  let allColors = document.querySelectorAll(".round");
  let initialId = 1;
  allColors.forEach(function (element) {
    element.id = initialId++;
  });
}

function initOrRemoveRound(status) {
  allRounds = document.querySelectorAll(".user-panel").forEach(function (el) {
    let allSpots = el.children;
    for (let i = 0; i < allSpots.length; i++) {
      let targetElement = allSpots[i];
      let parent_id = el.parentElement.getAttribute("id");
      if (parent_id == round && status == "on") {
        el.parentElement.firstChild.id = "active";
        targetElement.addEventListener("drop", handleDrop);
        targetElement.addEventListener("dragover", handleDragOver);
      } else if (parent_id == round) {
        el.parentElement.firstChild.id = "deactive";
        targetElement.removeEventListener("drop", handleDrop);
        targetElement.removeEventListener("dragover", handleDragOver);
      }
    }
  });
}

function initRound() {
  initOrRemoveRound("on");
}

function removeRound() {
  initOrRemoveRound();
}

function handleDrop(ev) {
  if (ev.target.nodeName == "IMG") {
    return false;
  }
  if (ev.target.nodeName == "DIV" && ev.target.hasChildNodes()) {
    return false;
  }

  ev.preventDefault();
  last_class = ev.target.getAttribute("class").slice(0, 11);
  ev.target.setAttribute(
    "class",
    last_class + " " + ev.dataTransfer.getData("text/plain")
  );
}

function handleDragOver(ev) {
  ev.preventDefault();
}

function handleDragStart(ev) {
  console.debug(ev.target.id);
  ev.dataTransfer.setData("text/plain", ev.target.id);
}

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

  if (repeatColor == 0) {
    repeatColor = 1;
    el.innerText = "Yes";
  } else {
    repeatColor = 0;
    el.innerText = "No";
  }
}

function startTimer() {
  const minutes = Math.floor(roundTime / 60);
  let seconds = roundTime % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  const contdownEl = document.getElementById("time-panel");

  if (!contdownEl) {
    return;
  }

  contdownEl.innerHTML = `${minutes}:${seconds}`;
  roundTime--;
  if (roundTime < 0) {
    goRound();
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

startWindows();
