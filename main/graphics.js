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

    fillPumpkinPatch(numPumpkins) {
        for (let i = 0; i < numPumpkins; i++) {
            var rowInd = Math.floor(i / this.rows);
            var colInd = i % this.cols;
            var cell = document.getElementById(`PumpkinPatch(${rowInd},${colInd})`)
            cell.innerHTML = '<img src="/images/pumpkin.svg">'
        }
    }

}

export class Ghosts {
    ghosts = document.querySelector(".ghosts");
    grid = document.createElement("table");
    rows = 6;
    cols = 1;

    main() {
        this.createCages();
        this.ghosts.appendChild(this.grid);
    }

    createCages() {
        for (let i = 0; i < this.rows; i++) {
            let row = document.createElement("tr");
            let col = document.createElement("td");

            col.id = `Ghosts(${i},0)`;
            col.innerHTML = '<img src="/images/trapped_ghost.svg">'

            row.appendChild(col);
            this.grid.appendChild(row);
        }
    }

    freeGhost(rowInd) {
        let row = document.getElementById(`Ghosts(${rowInd},0)`);
        row.innerHTML = '<img src="/images/happy_ghost.svg">';
    }

    breakOutOfCage(rowInd) {
        let row = document.getElementById(`Ghosts(${rowInd},0)`);
        row.innerHTML = '<img src="/images/angry_ghost.svg">';
    }
}

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
}

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
                col.id = `Alphabets(0,${i})`;
                row1.appendChild(col)
            }
            else {
                col.id = `Alphabets(0,${i})`;
                row2.appendChild(col);
            }

            col.innerText = this.alphabets[i].toUpperCase();
        }
        this.grid.appendChild(row1);
        this.grid.appendChild(row2);
    }
}