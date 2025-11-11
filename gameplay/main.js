import { PumpkinPatch, Ghosts, WordBlock, Alphabets} from "./graphics.js";
import { WordGenerator } from "./wordGenerator.js" ;

let pumpkinPatch;
let ghosts;
let wordBlock;
let alphabets;
let wordGenerator;
let maxTurns;
let turn;
let currentPumpkins;
let isHardMode = false;
let guessedLetters;

const basePointNormal = 1;
const basePointHard = 2;
const remainingGhostsBonus = 1;

let numHappyGhosts = 0;
let numAngryGhosts = 0;
let numNeutralGhosts = 0;
let totalPumpkins = 0;


// region beginning
function main() {
    clearGameWindow(true);

    maxTurns = 10;
    turn = 1;
    currentPumpkins = 0;

    pumpkinPatch = new PumpkinPatch(10, 10);
    pumpkinPatch.main();

    addDifficultyChoice();
}


function addDifficultyChoice() {
    clearGameWindow();
    displayScore();

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
    guessedLetters = new Array();
    
    if (difficulty == "hard") {
        isHardMode = true;
    }
    else {
        isHardMode = false;
    }

    removeExistingElements(document.querySelector(".difficultyChoice"));

    alphabets = new Alphabets();
    wordGenerator = new WordGenerator(difficulty);

    let word = wordGenerator.generateRandomWord();
    let hintMessage = wordGenerator.getHint();

    wordBlock = new WordBlock(word);

    wordBlock.main();
    alphabets.main();

    addGuessOptions();
    addHintButton(hintMessage);
}


// region turn actions
function addHintButton(hintMessage) {
    let hintBlock = document.querySelector(".hint");
    let hintButton = document.createElement("button");

    hintButton.textContent = "GET HINT";
    hintBlock.appendChild(hintButton);
    
    hintButton.addEventListener("click", () => showHint(hintMessage));
}


function addGuessOptions() {
    let guessBlock = document.querySelector(".guessOptions");
    let guessLetter = document.createElement("button");
    let guessWord = document.createElement("button");
    let giveUp = document.createElement("button");

    removeExistingElements(guessBlock);
    guessLetter.textContent = "Guess a Letter";
    guessBlock.appendChild(guessLetter);
    guessLetter.addEventListener("click", promptGuessLetter);

    guessWord.textContent = "Guess the Word";
    guessBlock.appendChild(guessWord);
    guessWord.addEventListener("click", promptGuessWord);

    giveUp.textContent = "Give up";
    giveUp.id = "giveUp";
    guessBlock.appendChild(giveUp);
    giveUp.addEventListener("click", neutraliseRemainingGhosts);
}


function promptGuessLetter() {
    removeExistingElements(document.querySelector(".messages"));
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

    addConfirmGuessButton("letter");
    addCancelButton();
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

    addConfirmGuessButton("word");
    addCancelButton();
}


function addConfirmGuessButton(category) {
    let confirm = document.createElement("button");
    confirm.textContent = "GUESS";
    confirm.id = "confirmButton";

    document.querySelector(".guessOptions").appendChild(confirm);

    if (category == "letter") {
        confirm.addEventListener("click", processGuessedLetter)
    }
    else if (category == "word") {
        confirm.addEventListener("click", processGuessedWord);
    }
}


function addCancelButton() {
    let cancelButton = document.createElement("button");
    cancelButton.textContent = "CANCEL";
    cancelButton.id = "cancelButton";

    document.querySelector(".guessOptions").appendChild(cancelButton);

    cancelButton.addEventListener("click", addGuessOptions);
}


// region process turn
function showHint(hintMessage) {
    removeExistingElements(document.querySelector(".hint"));

    let hintBlock = document.createElement("p");
    hintBlock.textContent = "HINT: " + hintMessage;

    document.querySelector(".hint").appendChild(hintBlock);

    ghosts.freeNeutralGhost((turn-1) % 5, Math.floor((turn-1)/5));
    numNeutralGhosts += 1;

    turn += 1;

    displayScore();

    if (turn == maxTurns) {
        endGame("The word was \"" + wordBlock.getWord() + "\"", true);
    }
}

function processGuessedLetter() {
    let guessedLetter = document.getElementById("guessedLetter").value;
    wordGenerator.buildGuessedWord(guessedLetter);
    let word = wordBlock.getWord();
    let numPumpkinsBefore = currentPumpkins;

    //Checking repeated guess
    if (guessedLetters.includes(guessedLetter)) {
        let message = document.createElement("p");
        message.textContent = `You already guessed "${guessedLetter.toUpperCase()}"`;
        document.querySelector(".messages").appendChild(message);

        ghosts.freeNeutralGhost((turn-1) % 5, Math.floor((turn-1)/5));
        numNeutralGhosts += 1;
    }

    else {
        // Check if the guessed letter is correct
        if (word.includes(guessedLetter)) {
            let pumpkinsToAdd = calculateChangeInPumpkins();

            numHappyGhosts += 1;
            currentPumpkins = pumpkinPatch.addPumpkins(currentPumpkins, pumpkinsToAdd);
            totalPumpkins += (currentPumpkins - numPumpkinsBefore);

            alphabets.highlightAlphabet(guessedLetter, "correct");
            ghosts.freeGhost((turn-1) % 5, Math.floor((turn-1)/5));
            wordBlock.fillLetter(guessedLetter);

            if (turn == maxTurns) {
                checkPumpkinLimit();
            }
        }
        else {
            if (currentPumpkins != 0) {
                currentPumpkins = pumpkinPatch.removePumpkins(currentPumpkins, calculateChangeInPumpkins());
                totalPumpkins -= (numPumpkinsBefore - currentPumpkins);
            }

            numAngryGhosts += 1;

            alphabets.highlightAlphabet(guessedLetter, "incorrect");
            ghosts.breakOutOfCage((turn-1) % 5, Math.floor((turn-1)/5));
        }
    }

    //Ending turn
    if (turn == maxTurns) {
        endGame("The word was \"" + wordBlock.getWord() + "\"");
    }

    else if (wordGenerator.getGuessedWord() == word) {
        freeRemainingGhosts();
        endGame("The word was \"" + wordBlock.getWord() + "\"")
    }

    else {
        removeExistingElements(document.querySelector(".guessOptions"));
        addGuessOptions();
        turn += 1
    }

    guessedLetters.push(guessedLetter);
    displayScore();
}


function processGuessedWord() {
    let guessedWord = document.getElementById("guessedWord").value;
    let word = wordBlock.getWord();

    endGame("The word was \"" + wordBlock.getWord() + "\"");

    if (guessedWord.toLowerCase() == word.toLowerCase()) {
        freeRemainingGhosts()
        wordBlock.autoFillLetters(word);
    }
    
    else {
        breakOutRemainingGhosts();
    }

    displayScore();
}


function freeRemainingGhosts() {
    let pumpkinsToAdd = 0;
    let numPumpkinsBefore = currentPumpkins;

    for (let i = turn; i <= maxTurns; i++) {
        ghosts.freeGhost((i-1) % 5, Math.floor((i-1)/5));
        pumpkinsToAdd += calculateChangeInPumpkins(true);
        numHappyGhosts += 1;
    }

    currentPumpkins = pumpkinPatch.addPumpkins(currentPumpkins, pumpkinsToAdd);
    totalPumpkins += (currentPumpkins - numPumpkinsBefore);

    checkPumpkinLimit();
}


function breakOutRemainingGhosts() {
    let pumpkinsToRemove = 0;
    let numPumpkinsBefore = currentPumpkins;

    for (let i = turn; i <= maxTurns; i++) {
        ghosts.breakOutOfCage((i-1) % 5, Math.floor((i-1)/5));
        pumpkinsToRemove += calculateChangeInPumpkins(true);
        numAngryGhosts += 1;
    }

    currentPumpkins = pumpkinPatch.removePumpkins(currentPumpkins, pumpkinsToRemove);
    totalPumpkins -= (numPumpkinsBefore - currentPumpkins);
}


function neutraliseRemainingGhosts() {
    for (let i = turn; i <= maxTurns; i++) {
        ghosts.freeNeutralGhost((i-1) % 5, Math.floor((i-1)/5));
        numNeutralGhosts += 1;
    }

    displayScore();
    endGame("The word was \"" + wordBlock.getWord() + "\"");
}


// region score
function displayScore() {
    removeExistingElements(document.querySelector(".score"));

    addScore("happy");
    addScore("angry");
    addScore("neutral");
    addScore("pumpkin")
}


function addScore(category) {
    let scoreBlock = document.querySelector(".score");
    let scoreGrid = document.createElement("table");
    let scoreRow = document.createElement("tr");
    let scoreIcon = document.createElement("td");
    let score = document.createElement("td");

    if (category == "happy") {
        scoreIcon.innerHTML = '<img src = "../images/happy_ghost_left.svg">';
        score.textContent = `: ${numHappyGhosts}`; 
    }
    else if (category == "angry") {
        scoreIcon.innerHTML = '<img src = "../images/angry_ghost_left.svg">';
        score.textContent = `: ${numAngryGhosts}`;
    }
    else if (category == "neutral") {
        scoreIcon.innerHTML = '<img src = "../images/neutral_ghost_left.svg">';
        score.textContent = `: ${numNeutralGhosts}`;
    }
    else if (category == "pumpkin") {
        scoreIcon.innerHTML = '<img src = "../images/pumpkin.svg">';
        scoreIcon.id = "pumpkinScoreIcon";
        score.textContent = `: ${totalPumpkins}`;
    }

    scoreRow.appendChild(scoreIcon);
    scoreRow.appendChild(score);
    scoreGrid.appendChild(scoreRow);
    scoreBlock.appendChild(scoreGrid);
}


function calculateChangeInPumpkins(RemainingGhosts = false) {
    let changeInPumpkins = 0;

    if (isHardMode) {
        changeInPumpkins += basePointHard;
    }
    else {
        changeInPumpkins += basePointNormal;
    }
    if (RemainingGhosts) {
        changeInPumpkins += remainingGhostsBonus;
    }

    return changeInPumpkins;
}


// region end
function endGame(customMessage, continueGame = true) {
    let messageBlock = document.querySelector(".messages");
    removeExistingElements(document.querySelector(".guessOptions"));
    removeExistingElements(document.querySelector(".hint"));
    removeExistingElements(document.querySelector(".messages"));

    let exitMessage = document.createElement("p");

    exitMessage.textContent = customMessage;

    messageBlock.appendChild(exitMessage);

    if (continueGame) {
        addContinueGameButton();
    }

    else {
        addRestartGameButton();
    }
    
}


function addContinueGameButton() {
    let continueGameButton = document.createElement("button");
    continueGameButton.textContent = "CONTINUE?";

    document.querySelector(".messages").appendChild(continueGameButton);
    continueGameButton.addEventListener("click", addDifficultyChoice);
}


function addRestartGameButton() {
    let restartGameButton = document.createElement("button");
    restartGameButton.textContent = "RESTART?";

    document.querySelector(".messages").appendChild(restartGameButton);
    restartGameButton.addEventListener("click", main);
}


function checkPumpkinLimit() {
    if (currentPumpkins >= (pumpkinPatch.rows * pumpkinPatch.cols)) {
        endGame("You have filled all the pumpkins", false);
    }
}


function removeExistingElements(obj) {
    obj.innerHTML = "";
}


function clearGameWindow(restart = false) {
    if (restart) {
        removeExistingElements(document.querySelector(".pumpkinPatch"));
    }

    removeExistingElements(document.querySelector(".score"));
    removeExistingElements(document.querySelector(".guessOptions"));
    removeExistingElements(document.querySelector(".hint"));
    removeExistingElements(document.querySelector(".word"));
    removeExistingElements(document.querySelector(".alphabets"));
    removeExistingElements(document.querySelector(".ghostsLeft"));
    removeExistingElements(document.querySelector(".ghostsRight"));
    removeExistingElements(document.querySelector(".messages"));
}

window.addEventListener("DOMContentLoaded", main);