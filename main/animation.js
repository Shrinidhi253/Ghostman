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
                col.id = `${i}-${j}`;
                row.appendChild(col);
            }
            this.grid.appendChild(row);
        }
    }

    fillPumpkinPatch(numPumpkins) {
        for (let i = 0; i < numPumpkins; i++) {
            var rowInd = Math.floor(i / this.rows);
            var colInd = i % this.cols;
            var cell = document.getElementById(`${rowInd}-${colInd}`)
            cell.innerHTML = '<img src="/images/pumpkin.svg">'
        }
    }

}
