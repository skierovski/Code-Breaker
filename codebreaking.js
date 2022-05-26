let round = 1;
var colors = [
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
var randomColors = [];

function clearBody() {
  const parent = document.getElementById("body");
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

function go_round() {
  removeRoundZones(round);
  roundCheck();
  round = round + 1;
  initRoundZones(round);
}
function initCodeBreaking() {
  initColors();
  roundNumber();
  initRoundZones(round);
  randomColors = randomColor();
}

function randomColor() {
  var CodeColor = [];

  for (var i = 0; i < 5; i++) {
    var idx = Math.floor(Math.random() * colors.length);
    CodeColor.push(colors[idx]);
    colors.splice(idx, 1);
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

  for (let i = 0; i < user_panel.length; i++) {
    colorToCheck = user_panel[i].getAttribute("class").slice(12, 19);

    if (colorToCheck == randomColors[i]) {
      score_panel[i].setAttribute("class", "correct");
    } else {
      for (let j = 0; j < randomColors.length; j++) {
        if (randomColors[j] == colorToCheck) {
          score_panel[i].setAttribute("class", "posible");
        }
      }
    }
  }
}

function initColors() {
  let all_colors = document.querySelectorAll(".color");
  let initialId = 0;
  all_colors.forEach(function (element) {
    element.setAttribute("draggable", true);

    element.addEventListener("dragstart", handleDragStart);
    element.addEventListener("dragend", handleDragEnd);

    element.id = "color-" + initialId++;
  });
}

function roundNumber() {
  let all_colors = document.querySelectorAll(".round");
  let initialId = 1;
  all_colors.forEach(function (element) {
    element.id = initialId++;
  });
}

function initRoundZones(round) {
  all_roundZones = document
    .querySelectorAll(".user-panel")
    .forEach(function (element) {
      let all_kids = element.children;
      for (let i = 0; i < all_kids.length; i++) {
        let targetElement = all_kids[i];
        let parent_id = element.parentElement.getAttribute("id");
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

function removeRoundZones(round) {
  all_roundZones = document
    .querySelectorAll(".user-panel")
    .forEach(function (element) {
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

initCodeBreaking();
