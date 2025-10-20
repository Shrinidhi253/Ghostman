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
