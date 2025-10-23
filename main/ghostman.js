import { PumpkinPatch, Ghosts, WordBlock, Alphabets } from "./graphics.js";
let pumpkinPatch;
let ghosts;
let wordBlock;
let alphabets;
let turns = 6;
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
        ghosts.freeGhost(6 - turns);
        wordBlock.fillLetter(guessedLetter);
    }
    else {
        if (currentPumpkins != 0) {
            pumpkinPatch.removePumpkins(currentPumpkins, 1)
            currentPumpkins -= 1;
        }

        alphabets.highlightAlphabet(guessedLetter, "incorrect");
        ghosts.breakOutOfCage(6 - turns);
    }
    
    turns -= 1
}

function processGuessedWord() {
    let guessedWord = document.getElementById("guessedWord").value;
    let word = wordBlock.getWord();

    if (guessedWord.toLowerCase() == word.toLowerCase()) {
        let pumpkinsToAdd = 0
        for (let i = 6 - turns; i < turns; i++) {
            ghosts.freeGhost(i);
            pumpkinsToAdd += 2
        }
        
        pumpkinPatch.addPumpkins(currentPumpkins, pumpkinsToAdd);
    }
    else {

    }

    turns = 0;
}

function removeExistingElements(obj) {
    obj.innerHTML = "";
}

window.addEventListener("DOMContentLoaded", main);