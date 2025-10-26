// region PumpkinPatch
export class PumpkinPatch {
    patch = document.querySelector(".pumpkinPatch");
    grid = document.createElement("table");
    rows;
    cols;


    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
    }


    main() {
        this.createPumpkinPatch();
        this.patch.appendChild(this.grid);
    }


    createPumpkinPatch() {
        for (let i = 0; i < this.rows; i++) {
            let row = document.createElement("tr");

            for (let j = 0; j < this.cols; j++) {
                let col = document.createElement("td");
                col.id = `PumpkinPatch(${i},${j})`;
                row.appendChild(col);
            }
            this.grid.appendChild(row);
        }
    }


    addPumpkins(currentPumpkins, pumpkinsToAdd) {
        let startRowInd = Math.floor(currentPumpkins / this.cols);
        let startColInd = (currentPumpkins % this.cols);

        for (let i = 0; i < pumpkinsToAdd; i++) {
            if (startColInd > 9) {
                startRowInd += 1;
                startColInd %= this.cols;
            }

            let pumpkinCell = document.getElementById(`PumpkinPatch(${startRowInd},${startColInd})`);
            pumpkinCell.innerHTML = '<img src="/images/pumpkin.svg">';

            startColInd += 1;
        }
    }


    removePumpkins(currentPumpkins, pumpkinsToRemove) {
        let startRowInd = Math.floor((currentPumpkins - 1) / this.cols);
        let startColInd = ((currentPumpkins - 1) % this.cols);

        for (let i = 0; i < pumpkinsToRemove; i++) {
            if (startColInd < 0) {
                startRowInd -= 1;
                startColInd %= cols;
            }

            let pumpkinCell = document.getElementById(`PumpkinPatch(${startRowInd},${startColInd})`);
            pumpkinCell.innerHTML = "";

            startColInd -= 1;
        }
    }
}


// region Ghosts
export class Ghosts {
    ghostsLeft = document.querySelector(".ghostsLeft");
    ghostsRight = document.querySelector(".ghostsRight");
    grid1 = document.createElement("table");
    grid2 = document.createElement("table");
    rows = 5;
    cols = 2;


    main() {
        this.createCages();
        this.ghostsLeft.appendChild(this.grid1);
        this.ghostsRight.appendChild(this.grid2);
    }


    createCages() {
        for (let j = 0; j < this.cols; j++) {
            for (let i = 0; i < this.rows; i++) {
                let row = document.createElement("tr");
                let col = document.createElement("td");

                col.id = `Ghosts(${i},${j})`;

                if (j == 0) {
                    col.innerHTML = '<img src="/images/trapped_ghost_left.svg">';
                    row.appendChild(col);
                    this.grid1.appendChild(row);
                }
                else {
                    col.innerHTML = '<img src="/images/trapped_ghost_right.svg">';
                    row.appendChild(col);
                    this.grid2.appendChild(row);
                }
            }
        }
    }


    freeGhost(rowInd, colInd) {
        let cage = document.getElementById(`Ghosts(${rowInd},${colInd})`);
        if (colInd == 0) {
            cage.innerHTML = '<img src="/images/happy_ghost_left.svg">';
        }
        else {
            cage.innerHTML = '<img src="/images/happy_ghost_right.svg">';
        }
        
    }


    breakOutOfCage(rowInd, colInd) {
        let cage = document.getElementById(`Ghosts(${rowInd},${colInd})`);
        if (colInd == 0) {
            cage.innerHTML = '<img src="/images/angry_ghost_left.svg">';
        }
        else {
            cage.innerHTML = '<img src="/images/angry_ghost_right.svg">';
        }
    }


    freeNeutralGhost(rowInd, colInd) {
        let cage = document.getElementById(`Ghosts(${rowInd},${colInd})`);
        if (colInd == 0) {
            cage.innerHTML = '<img src="/images/neutral_ghost_left.svg">';
        }
        else {
            cage.innerHTML = '<img src="/images/neutral_ghost_right.svg">';
        }
    }
}


// region WordBlock
export class WordBlock {
    wordBlock = document.querySelector(".word");
    grid = document.createElement("table");


    constructor(word) {
        this.word = word;
    }


    main() {
        this.createLetterSpaces();
        this.wordBlock.appendChild(this.grid);
    }


    createLetterSpaces() {
        let row = document.createElement("tr");

        for (let i = 0; i < this.word.length; i++) {
            let col = document.createElement("td");
            col.id = `Word(0,${i})`
            row.appendChild(col);
        }

        this.grid.appendChild(row);
    }


    fillLetter(letter) {
        for (let i = 0; i < this.word.length; i++) {
            if (this.word[i].toLowerCase() == letter.toLowerCase()) {
                let letterBlock = document.getElementById(`Word(0,${i})`);
                letterBlock.innerText = `${letter.toUpperCase()}`;
            }
        }
    }


    getWord() {
        return this.word;
    }


    autoFillLetters(guessedWord) {
        if (guessedWord.length == this.word.length) {
            for (let i = 0; i < guessedWord.length; i++) {
                if (guessedWord[i] == this.word[i]) {
                    let letterBlock = document.getElementById(`Word(0,${i})`);
                    letterBlock.innerText = `${guessedWord[i].toUpperCase()}`;
                }
            }
        }
    }
}


// region Alphabets
export class Alphabets {
    alphabetsBlock = document.querySelector(".alphabets");
    grid = document.createElement("table");
    alphabets = "abcdefghijklmnopqrstuvwxyz";


    main() {
        this.displayAllAlphabets();
        this.alphabetsBlock.appendChild(this.grid);
    }


    displayAllAlphabets() {
        let row1 = document.createElement("tr");
        let row2 = document.createElement("tr");

        for (let i = 0; i < 26; i++) {
            let col = document.createElement("td");

            if (Math.floor(i/13) == 0) {
                col.id = `Alphabets(0,${i % 13})`;
                row1.appendChild(col)
            }
            else {
                col.id = `Alphabets(1,${i % 13})`;
                row2.appendChild(col);
            }

            col.innerText = this.alphabets[i].toUpperCase();
        }
        this.grid.appendChild(row1);
        this.grid.appendChild(row2);
    }


    highlightAlphabet(alphabet, guessCategory) {
        let colour;
        if (guessCategory.toLowerCase() == "correct") {
            colour = "#49863bff";
        }
        else {
            colour = "#cc4b3d";
        }

        let alphabetPos = this.alphabets.indexOf(alphabet.toLowerCase());
        let rowInd = Math.floor(alphabetPos / 13);
        let colInd = alphabetPos % 13;

        let alphabetCell = document.getElementById(`Alphabets(${rowInd},${colInd})`);
        alphabetCell.style.backgroundColor = colour;
    }
}