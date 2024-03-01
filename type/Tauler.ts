class Tauler {
    caselles: Casella[][];
    files: number;
    columnes: number;
    mines: number;

    constructor(files: number, columnes: number, mines: number) {
        this.files = files;
        this.columnes = columnes;
        this.caselles = [];
        this.mines = mines;
        this.generarCaselles(files, columnes, mines);
    }

    private generarCaselles(files: number, columnes: number, mines: number) {
        for (let i = 0; i < files; i++) {
            this.caselles[i] = [];
            for (let j = 0; j < columnes; j++) {
                this.caselles[i][j] = new Casella(false);
            }
        }
        this.posarMines(mines);
    }

    private posarMines(mines: number) {
        let minesPosades = 0;
        while (minesPosades < mines) {
            const fila = Math.floor(Math.random() * this.files);
            const columna = Math.floor(Math.random() * this.columnes);
            if (!this.caselles[fila][columna].esMina) {
                this.caselles[fila][columna].esMina = true;
                minesPosades++;
            }
        }
    }

    public comptarMinesAdjacents(fila: number, columna: number) {
        let mines = 0;
        for (let i = fila - 1; i <= fila + 1; i++) {
            for (let j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < this.files && j >= 0 && j < this.columnes) {
                    if (this.caselles[i][j].esMina) {
                        mines++;
                    }
                }
            }
        }
        return mines;
    }

    public comprovarGuanyat() {
        let numBanderes: any = document.getElementById('numBanderes').innerHTML;;
        let casellesNoRevelades = 0;
        let resposta: number = 0;
        let banderesCorrectes = 0;
        for (let i = 0; i < this.files; i++) {
            for (let j = 0; j < this.columnes; j++) {
                if (!this.caselles[i][j].revelada && !this.caselles[i][j].marcada) {
                    casellesNoRevelades++;
                    resposta = casellesNoRevelades - numBanderes;
                } else if (!this.caselles[i][j].revelada) {
                    casellesNoRevelades++;
                    resposta = casellesNoRevelades - numBanderes;
                } else if (this.caselles[i][j].marcada) {
                    if (this.caselles[i][j].esMina) {
                        banderesCorrectes++;
                        resposta = this.mines - banderesCorrectes;
                    }
                }
            }
        }
        if (resposta == 0) {
            return true;
        }
        return false;
    }
}