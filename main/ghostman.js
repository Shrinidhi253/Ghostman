import { PumpkinPatch, Ghosts, WordBlock, Alphabets } from "./graphics.js";
let pumpkinPatch;
let ghosts;
let wordBlock;
let alphabets;
let maxTurns = 6;
let turn = 1;
let currentPumpkins = 0;

function main() {
    pumpkinPatch = new PumpkinPatch(10, 10);
    ghosts = new Ghosts();
    wordBlock = new WordBlock("somethings");
    alphabets = new Alphabets();

    pumpkinPatch.main();
    ghosts.main();
    wordBlock.main();
    alphabets.main();

    addGuessOptions();
}

function addGuessOptions() {
    let guessBlock = document.querySelector(".guessOptions");
    let guessLetter = document.createElement("button");
    let guessWord = document.createElement("button");

    guessLetter.textContent = "Guess a Letter";
    guessBlock.appendChild(guessLetter);
    guessLetter.addEventListener("click", promptGuessLetter);

    guessWord.textContent = "Guess the Word";
    guessBlock.appendChild(guessWord);
    guessWord.addEventListener("click", promptGuessWord);

}

function promptGuessLetter() {
    let guessBlock = document.querySelector(".guessOptions");

    const alphabets = "abcdefghijklmnopqrstuvwxyz";

    let promptText = document.createElement("p");
    let guessPrompt = document.createElement("select");
    let confirm = document.createElement("button");

    promptText.textContent = "Which letter do you guess? ";
    guessPrompt.id = "guessedLetter";
    confirm.textContent = "GUESS";

    removeExistingElements(guessBlock);
    guessBlock.appendChild(promptText);
    guessBlock.appendChild(guessPrompt);
    guessBlock.appendChild(confirm);

    for (let i = 0; i < 26; i++) {
        let option = document.createElement("option");
        option.text = alphabets[i].toUpperCase();
        option.value = alphabets[i];

        guessPrompt.appendChild(option);
    }

    confirm.addEventListener("click", processGuessedLetter);

}

function promptGuessWord() {
    //TODO guessBlock and button creation are repeated from promptGuessLetter - make a function?
    let guessBlock = document.querySelector(".guessOptions");

    let promptText = document.createElement("p");
    let guessPrompt = document.createElement("input");
    let confirm = document.createElement("button");

    promptText.textContent = "What is the word? ";
    guessPrompt.type = "text";
    guessPrompt.id = "guessedWord";
    confirm.textContent = "GUESS";

    removeExistingElements(guessBlock);
    guessBlock.appendChild(promptText);
    guessBlock.appendChild(guessPrompt);
    guessBlock.appendChild(confirm);

    confirm.addEventListener("click", processGuessedWord);
}

function processGuessedLetter() {
    let guessedLetter = document.getElementById("guessedLetter").value;
    let word = wordBlock.getWord();

    if (word.includes(guessedLetter)) {
        pumpkinPatch.addPumpkins(currentPumpkins, 1);
        currentPumpkins += 1;

        alphabets.highlightAlphabet(guessedLetter, "correct");
        ghosts.freeGhost(turn-1);
        wordBlock.fillLetter(guessedLetter);
    }
    else {
        if (currentPumpkins != 0) {
            pumpkinPatch.removePumpkins(currentPumpkins, 1)
            currentPumpkins -= 1;
        }

        alphabets.highlightAlphabet(guessedLetter, "incorrect");
        ghosts.breakOutOfCage(turn-1);
    }
    
    if (turn == maxTurns) {
        endGame();
    }

    else {
        removeExistingElements(document.querySelector(".guessOptions"));
        addGuessOptions();
        turn += 1
    }
}

function processGuessedWord() {
    let guessedWord = document.getElementById("guessedWord").value;
    let word = wordBlock.getWord();

    endGame();

    if (guessedWord.toLowerCase() == word.toLowerCase()) {
        let pumpkinsToAdd = 0

        for (let i = turn; i <= maxTurns; i++) {
            ghosts.freeGhost(i-1);
            pumpkinsToAdd += 2
        }

        pumpkinPatch.addPumpkins(currentPumpkins, pumpkinsToAdd);
    }
    
    else {
        let pumpkinsToRemove = 0;

        for (let i = turn; i <= maxTurns; i++) {
            ghosts.breakOutOfCage(i-1);
            pumpkinsToRemove += 1;
        }

        pumpkinPatch.removePumpkins(currentPumpkins, pumpkinsToRemove);
    }
}

function removeExistingElements(obj) {
    obj.innerHTML = "";
}

function endGame() {
    let guessBlock = document.querySelector(".guessOptions")
    removeExistingElements(guessBlock);

    let exitMessage = document.createElement("p");
    exitMessage.textContent = "GAME OVER";

    guessBlock.appendChild(exitMessage);
}

window.addEventListener("DOMContentLoaded", main);