let CodeBreak = ['color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'color_6', 'color_7', 'color_8', 'color_9', 'color_10', 'color_11',]
let time = 60;
let refreshIntervalId = setInterval(startTimer, 1000);
let round = 0
let roundEnd = false;

function handleDrop(ev) {
    const id = ev.dataTransfer.getData("text/plain");
    ev.target.setAttribute('id', id)
    ev.preventDefault()
}

function handleDragOver(ev) {
    ev.preventDefault()
}

function initDropzone(roundEnd) {
    let allDropZones = document.querySelectorAll('.game-box')[round]
    let all_kids = allDropZones.children;
    for (let i = 0; i < all_kids.length; i++) {
        let targetElement = all_kids[i];
        if (roundEnd === true) {
            targetElement.parentElement.removeAttribute("id")
            targetElement.removeEventListener("drop", handleDrop);
            targetElement.removeEventListener("dragover", handleDragOver);
        } else {
            targetElement.parentElement.setAttribute("id", "active_game_box")
            targetElement.addEventListener("drop", handleDrop);
            targetElement.addEventListener("dragover", handleDragOver);
        }
    }
}

function initDragAndDrop() {
    InitElements();
    initDropzone();
}


function go_round(round) {
    let roundDivs = document.querySelectorAll(".box")[round]
    roundDivs.setAttribute("id", 'active')
}

function handleDragStart(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id)
    ev.target.classList.add("dragged")
}

function handleDragEnd(ev) {
    ev.target.classList.remove("dragged")
}

function InitElements() {
    let all_colors = document.querySelectorAll('.colorbox');
    all_colors.forEach(function(element) {
        element.setAttribute("draggable", true)
        element.addEventListener("dragstart", handleDragStart)
        element.addEventListener("dragend", handleDragEnd)

    })

}

function InitnextRound() {
    CheckoffOutplacement()
    roundEnd = true
    initDropzone(roundEnd)
    time = 60
    setInterval(refreshIntervalId);
    let lastRound = document.querySelectorAll(".box")[round]
    lastRound.removeAttribute("id")
    round = round + 1
    go_round(round)
    initDropzone()
}

function startTimer() {
    const minutes = Math.floor(time / 60); // rounds a number DOWN to the nearest integer
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds; 
    const countdownEl = document.getElementById("timer");
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    time--;
    if (time < 0) {
        InitnextRound()
    }
}

function CheckoffOutplacement () {
    let allDropZones = document.querySelectorAll('.game-box')[round]
    let all_kids = allDropZones.children;
    for (let i = 0; i < all_kids.length; i++) {
        let targetElement = all_kids[i];
        let colorGuessed = targetElement.id
        if (CodeBreak.includes(colorGuessed)) {
            targetElement.setAttribute('class', 'guessed')
            if (colorGuessed === CodeBreak[i]) {
                targetElement.setAttribute('class', 'guessed-position')
            }
        } else {
            targetElement.setAttribute('class', 'not-guessed')
        }
    }
}

function randomColor() {
    CodeBreak = CodeBreak.sort(() => Math.random() - 0.5)
    let elemsToDelete = 4;
    while (elemsToDelete--) {
        CodeBreak.pop()
    }
}

function game() {
    randomColor()
    go_round(round)
    startTimer()
    initDragAndDrop()
}
game()