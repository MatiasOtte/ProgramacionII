const easyWords = ["linux", "bash", "unix", "gui", "boot"];
const mediumWords = ["kernel", "process", "thread", "windows", "shell"];
const hardWords = ["multitasking", "synchronization", "virtualization", "scheduler", "firmware"];

let currentWord = "";
let displayedWord = [];
let errors = 0;
let maxErrors = 6;
let players = [];
let currentPlayerIndex = 0;
let currentDifficulty = "";

function startGame() {
    const p1 = document.getElementById("player1").value.trim();
    const p2 = document.getElementById("player2").value.trim();
    const difficulty = document.getElementById("difficulty").value;

    if (!p1 || !p2) {
        alert("Por favor ingrese los nombres de ambos jugadores.");
        return;
    }

    players = [p1, p2];
    currentPlayerIndex = 0;
    currentDifficulty = difficulty;
    currentWord = getRandomWord(difficulty).toLowerCase();
    displayedWord = Array(currentWord.length).fill("_");
    errors = 0;

    document.querySelector(".player-setup").style.display = "none";
    document.querySelector(".game").style.display = "block";
    document.getElementById("errors").textContent = errors;
    document.getElementById("game-controls").style.display = "none";
    updateDisplay();
    generateLetterButtons();
}

function getRandomWord(difficulty) {
    if (difficulty === "easy") return easyWords[Math.floor(Math.random() * easyWords.length)];
    if (difficulty === "medium") return mediumWords[Math.floor(Math.random() * mediumWords.length)];
    return hardWords[Math.floor(Math.random() * hardWords.length)];
}

function generateLetterButtons() {
    const container = document.getElementById("letters");
    container.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const btn = document.createElement("button");
        btn.textContent = String.fromCharCode(i);
        btn.onclick = () => handleGuess(btn.textContent.toLowerCase(), btn);
        container.appendChild(btn);
    }
}

function handleGuess(letter, button) {
    button.disabled = true;
    if (currentWord.includes(letter)) {
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter) {
                displayedWord[i] = letter;
            }
        }
        if (!displayedWord.includes("_")) {
            document.getElementById("message").textContent = `${players[currentPlayerIndex]} ha ganado 🎉`;
            document.getElementById("letters").innerHTML = "";
            showGameControls();
        }
    } else {
        errors++;
        document.getElementById("errors").textContent = errors;
        if (errors >= maxErrors) {
            document.getElementById("message").textContent = `¡${players[currentPlayerIndex]} ha perdido! La palabra era "${currentWord}"`;
            document.getElementById("letters").innerHTML = "";
            showGameControls();
        } else {
            currentPlayerIndex = 1 - currentPlayerIndex;
        }
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("word-display").textContent = displayedWord.join(" ");
    document.getElementById("current-player").textContent = `Turno de: ${players[currentPlayerIndex]}`;
}

function showGameControls() {
    const gameControls = document.getElementById("game-controls");
    gameControls.style.display = "block";
}

function playAgain() {
    // Reiniciar el juego con los mismos jugadores y dificultad
    currentWord = getRandomWord(currentDifficulty).toLowerCase();
    displayedWord = Array(currentWord.length).fill("_");
    errors = 0;
    document.getElementById("errors").textContent = errors;
    document.getElementById("message").textContent = "";
    document.getElementById("game-controls").style.display = "none";
    updateDisplay();
    generateLetterButtons();
}

function backToMenu() {
    // Volver a la pantalla de configuración
    document.querySelector(".player-setup").style.display = "block";
    document.querySelector(".game").style.display = "none";
    document.getElementById("message").textContent = "";
    document.getElementById("game-controls").style.display = "none";
}
