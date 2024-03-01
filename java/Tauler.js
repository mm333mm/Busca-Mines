"use strict";
class Tauler {
    constructor(files, columnes, mines) {
        this.files = files;
        this.columnes = columnes;
        this.caselles = [];
        this.mines = mines;
        this.generarCaselles(files, columnes, mines);
    }
    generarCaselles(files, columnes, mines) {
        for (let i = 0; i < files; i++) {
            this.caselles[i] = [];
            for (let j = 0; j < columnes; j++) {
                this.caselles[i][j] = new Casella(false);
            }
        }
        this.posarMines(mines);
    }
    posarMines(mines) {
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
    comptarMinesAdjacents(fila, columna) {
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
    comprovarGuanyat() {
        let numBanderes = document.getElementById('numBanderes').innerHTML;
        ;
        let casellesNoRevelades = 0;
        let resposta = 0;
        let banderesCorrectes = 0;
        for (let i = 0; i < this.files; i++) {
            for (let j = 0; j < this.columnes; j++) {
                if (!this.caselles[i][j].revelada && !this.caselles[i][j].marcada) {
                    casellesNoRevelades++;
                    resposta = casellesNoRevelades - numBanderes;
                }
                else if (!this.caselles[i][j].revelada) {
                    casellesNoRevelades++;
                    resposta = casellesNoRevelades - numBanderes;
                }
                else if (this.caselles[i][j].marcada) {
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
