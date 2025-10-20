import { PumpkinPatch, Ghosts, WordBlock, Alphabets } from "./graphics.js";
let pumpkinPatch;
let ghosts;
let wordBlock;
let alphabets;

function main() {
    addGuessOptions();

    pumpkinPatch = new PumpkinPatch(10, 10);
    ghosts = new Ghosts();
    wordBlock = new WordBlock("somethings");
    alphabets = new Alphabets();

    pumpkinPatch.main();
    ghosts.main();
    wordBlock.main();
    alphabets.main();
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
    const alphabets = "abcdefghijklmnopqrstuvwxyz";

    let guessPrompt = document.createElement("select");
    let confirm = document.createElement("button");

    guessPrompt.id = "guessedLetter";
    
    for (let i = 0; i < 26; i++) {
        let option = document.createElement("option");
        option.text = alphabets[i].toUpperCase();
        option.value = alphabets[i];

        guessPrompt.appendChild(option);
    }

    confirm.addEventListener("click", processGuessedLetter);
    
    

}

function promptGuessWord() {

}
function processGuessedLetter() {

}

function processGuessedWord() {

}

window.addEventListener("DOMContentLoaded", main);