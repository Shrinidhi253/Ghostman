export class PumpkinPatch {
    private patch : HTMLDivElement = document.querySelector(".pumpkinPatch")!;
    private grid : HTMLTableElement = document.createElement("table");
    private rows : number;
    private cols : number;

    constructor(rows: number, cols : number) {
        this.rows = rows;
        this.cols = cols;
    }

    main() : void {
        this.createPumpkinPatch();
        this.patch.appendChild(this.grid);
    }

    createPumpkinPatch() : void {
        for (let i : number = 0; i < this.rows; i++) {
            let row : HTMLTableRowElement = document.createElement("tr");

            for (let j : number = 0; j < this.cols; j++) {
                let col : HTMLTableCellElement = document.createElement("td");
                col.id = `${i}-${j}`;
                col.textContent = `${i}-${j}`;
                row.appendChild(col);
            }
            this.grid.appendChild(row);
        }
    }

}
