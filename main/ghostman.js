import { PumpkinPatch, Ghosts, WordBlock, Alphabets, Hint } from "./graphics.js";
import { WordGenerator } from "./wordGenerator.js" ;

let pumpkinPatch;
let ghosts;
let wordBlock;
let alphabets;
let wordGenerator;
let hint;
let maxTurns = 10;
let turn = 1;
let currentPumpkins = 0;

function main() {
    pumpkinPatch = new PumpkinPatch(10, 10);
    pumpkinPatch.main();

    addDifficultyChoice();
}


function addDifficultyChoice() {
    removeExistingElements(document.querySelector(".guessOptions"));
    removeExistingElements(document.querySelector(".hint"));
    removeExistingElements(document.querySelector(".word"));
    removeExistingElements(document.querySelector(".alphabets"));
    removeExistingElements(document.querySelector(".ghosts"));

    ghosts = new Ghosts();
    ghosts.main();

    let normalButton = document.createElement("button");
    let hardButton = document.createElement("button");
    let choiceText = document.createElement("p");

    normalButton.id = "normalButton";
    hardButton.id = "hardButton";
    choiceText.id = "choiceText";

    normalButton.textContent = "Normal";
    hardButton.textContent = "Hard";
    choiceText.textContent = "Choose a difficulty: ";

    document.querySelector(".difficultyChoice").appendChild(choiceText);
    document.querySelector(".difficultyChoice").appendChild(normalButton);
    document.querySelector(".difficultyChoice").appendChild(hardButton);

    normalButton.addEventListener("click", () => startNewGame("normal"));

    hardButton.addEventListener("click", () => startNewGame("hard"));
}


function startNewGame(difficulty) {
    turn = 1;

    removeExistingElements(document.querySelector(".difficultyChoice"));

    alphabets = new Alphabets();
    wordGenerator = new WordGenerator(difficulty);

    let word = wordGenerator.generateRandomWord();
    let hintMessage = wordGenerator.getHint();

    wordBlock = new WordBlock(word);
    hint = new Hint(hintMessage);

    wordBlock.main();
    alphabets.main();

    addGuessOptions();
    hint.addHintButton();
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

    promptText.textContent = "Which letter do you guess? ";
    guessPrompt.id = "guessedLetter";

    removeExistingElements(guessBlock);
    guessBlock.appendChild(promptText);
    guessBlock.appendChild(guessPrompt);

    for (let i = 0; i < 26; i++) {
        let option = document.createElement("option");
        option.text = alphabets[i].toUpperCase();
        option.value = alphabets[i];

        guessPrompt.appendChild(option);
    }

    addGuessButton("letter");
}


function promptGuessWord() {
    let guessBlock = document.querySelector(".guessOptions");

    let promptText = document.createElement("p");
    let guessPrompt = document.createElement("input");

    promptText.textContent = "What is the word? ";
    guessPrompt.type = "text";
    guessPrompt.id = "guessedWord";

    removeExistingElements(guessBlock);
    guessBlock.appendChild(promptText);
    guessBlock.appendChild(guessPrompt);

    addGuessButton("word");
}


function addGuessButton(category) {
    let confirm = document.createElement("button");
    confirm.textContent = "GUESS";

    document.querySelector(".guessOptions").appendChild(confirm);

    if (category == "letter") {
        confirm.addEventListener("click", processGuessedLetter)
    }
    else if (category == "word") {
        confirm.addEventListener("click", processGuessedWord);
    }
}


function processGuessedLetter() {
    let guessedLetter = document.getElementById("guessedLetter").value;
    wordGenerator.buildGuessedWord(guessedLetter);
    let word = wordBlock.getWord();

    if (word.includes(guessedLetter)) {
        pumpkinPatch.addPumpkins(currentPumpkins, 1);
        currentPumpkins += 1;

        alphabets.highlightAlphabet(guessedLetter, "correct");
        ghosts.freeGhost((turn-1) % 5, Math.floor((turn-1)/5));
        wordBlock.fillLetter(guessedLetter);
    }
    else {
        if (currentPumpkins != 0) {
            pumpkinPatch.removePumpkins(currentPumpkins, 1)
            currentPumpkins -= 1;
        }

        alphabets.highlightAlphabet(guessedLetter, "incorrect");
        ghosts.breakOutOfCage((turn-1) % 5, Math.floor((turn-1)/5));
    }
    
    if (turn == maxTurns) {
        endGame();
    }

    else if (wordGenerator.getGuessedWord() == word) {
        freeAllGhosts();
        endGame()
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
        freeAllGhosts()
        wordBlock.autoFillLetters(word);
    }
    
    else {
        breakOutAllGhosts();
    }
}


function freeAllGhosts() {
    let pumpkinsToAdd = 0;

    for (let i = turn; i <= maxTurns; i++) {
        ghosts.freeGhost((i-1) % 5, Math.floor((i-1)/5));
        pumpkinsToAdd += 2;
    }

    pumpkinPatch.addPumpkins(currentPumpkins, pumpkinsToAdd);
    currentPumpkins += pumpkinsToAdd;
}


function breakOutAllGhosts() {
    let pumpkinsToRemove = 0;

    for (let i = turn; i <= maxTurns; i++) {
        ghosts.breakOutOfCage((i-1) % 5, Math.floor((i-1)/5));
        pumpkinsToRemove += 1;
    }

    pumpkinPatch.removePumpkins(currentPumpkins, pumpkinsToRemove);
    currentPumpkins -= pumpkinsToRemove;
}


function removeExistingElements(obj) {
    obj.innerHTML = "";
}


function endGame() {
    let guessBlock = document.querySelector(".guessOptions")
    removeExistingElements(guessBlock);
    removeExistingElements(document.querySelector(".hint"));

    let exitMessage = document.createElement("p");
    exitMessage.innerHTML = "The word was \"" + wordBlock.getWord() + "\"";

    guessBlock.appendChild(exitMessage);
    addContinueGameButton();
}


function addContinueGameButton() {
    let continueGameButton = document.createElement("button");
    continueGameButton.textContent = "CONTINUE?"

    document.querySelector(".hint").appendChild(continueGameButton);
    continueGameButton.addEventListener("click", addDifficultyChoice);
}

// FIXME Change some absurd definitions
// TODO Add more words to the database?
// TODO Add endgame() when currentPumpkins >= 100
// FIXME Change the CSS for the continue button (too close to the bottom-margin)
// TODO Update pumpkin filling depending on whether the user has asked for a hint
// TODO Change the hint-rules in README
// TODO Add how-the-game-works imgs to README


window.addEventListener("DOMContentLoaded", main);