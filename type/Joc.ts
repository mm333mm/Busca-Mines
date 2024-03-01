class Joc {
    tauler: Tauler;
    guanyat: boolean = false;
    perdut: boolean = false;
    banderes: number = 0;
    primerClick: boolean = false;

    constructor(files: number, columnes: number, mines: number) {
        this.tauler = new Tauler(files, columnes, mines);
        this.banderes = mines;
        document.getElementById('numBanderes').innerHTML = this.banderes.toString();
    }

    // Revela una casella donada la fila i la columna
    public revelarCasella(fila: number, columna: number) {
        if (!this.primerClick) {
            this.primerClick = true;
            this.iniciarContador();
        }
        if (!this.guanyat && !this.perdut && !this.tauler.caselles[fila][columna].marcada) {
            this.tauler.caselles[fila][columna].revelada = true;
            let casella = document.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
            if (this.tauler.caselles[fila][columna].esMina) {
                casella.classList.add('mina');
                this.perdut = true;
                this.revelarTauler();
                this.popUpToast("Has perdut");
            } else {
                casella.classList.add('noMina');
                casella.classList.add(`minesAdjacents${this.tauler.comptarMinesAdjacents(fila, columna)}`);
                let adj = this.tauler.comptarMinesAdjacents(fila, columna).toString();
                if (adj == "0") {
                    this.revelarAdjacents(fila, columna);
                }
                if (this.tauler.comprovarGuanyat()) {
                    this.guanyat = true;
                    this.revelarTauler();
                    this.popUpToast("Has guanyat");
                }
            }
        }
    }

    public revelarCasella2(fila: number, columna: number) {
        this.tauler.caselles[fila][columna].revelada = true;
        let casella = document.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
        if (this.tauler.caselles[fila][columna].esMina) {
            casella.classList.add('mina');
        } else {
            casella.classList.add('noMina');
            casella.classList.add(`minesAdjacents${this.tauler.comptarMinesAdjacents(fila, columna)}`);
        }
    }

    // Revela les caselles adjacents a la fila i la columna donades
    public revelarAdjacents(fila: number, columna: number) {
        for (let i = fila - 1; i <= fila + 1; i++) {
            for (let j = columna - 1; j <= columna + 1; j++) {
                if (i >= 0 && i < this.tauler.files && j >= 0 && j < this.tauler.columnes) {
                    if (!this.tauler.caselles[i][j].revelada) {
                        this.revelarCasella(i, j);
                    }
                }
            }
        }
        // this.dibuixarTaulerConsola();
    }

    public revelarTauler() {
        let delay = 0;
        for (let i = 0; i < this.tauler.files; i++) {
            for (let j = 0; j < this.tauler.columnes; j++) {
                if (!this.tauler.caselles[i][j].revelada) {
                    setTimeout(() => this.revelarCasella2(i, j), delay);
                    delay += 15;
                }
            }
        }
    }

    // Marca una casella donada la fila i la columna
    public marcarCasella(fila: number, columna: number) {
        if (!this.primerClick) {
            this.primerClick = true;
            this.iniciarContador();
        }
        if (!this.guanyat && !this.perdut && !this.tauler.caselles[fila][columna].revelada && this.banderes > 0) {
            let casella = document.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
            if (this.tauler.caselles[fila][columna].marcada) {
                this.tauler.caselles[fila][columna].marcada = false;
                casella.classList.remove('marcada');
                this.banderes++;
                document.getElementById('numBanderes').innerHTML = this.banderes.toString();
            } else {
                this.tauler.caselles[fila][columna].marcada = true;
                casella.classList.add('marcada');
                this.banderes--;
                document.getElementById('numBanderes').innerHTML = this.banderes.toString();
                if (this.tauler.comprovarGuanyat()) {
                    this.guanyat = true;
                    this.popUpToast("Has guanyat");
                }
            }
        }
    }
    // Dibuixa el tauler de joc
    public dibuixarTauler() {
        let tauler = document.getElementById('tauler');
        tauler.innerHTML = '';
        for (let i = 0; i < this.tauler.files; i++) {
            let fila = document.createElement('div');
            fila.classList.add('fila');
            for (let j = 0; j < this.tauler.columnes; j++) {
                let casella = document.createElement('div');
                casella.classList.add('casella');
                casella.dataset.fila = i.toString();
                casella.dataset.columna = j.toString();
                if (this.tauler.caselles[i][j].revelada) {
                    if (this.tauler.caselles[i][j].esMina) {
                        casella.classList.add('mina');
                    } else {
                        casella.classList.add('revelada');
                    }
                }
                casella.addEventListener('click', (event) => {
                    this.revelarCasella(i, j);
                });
                casella.addEventListener('contextmenu', (event) => {
                    event.preventDefault();
                    this.marcarCasella(i, j);
                });
                fila.appendChild(casella);
            }
            tauler.appendChild(fila);
        }
    }

    //divuixar tauler per consola com a taula amb els atributs de les caselles
    public dibuixarTaulerConsola() {
        console.table(this.tauler.caselles);
    }

    public getBanderes() {
        return this.banderes;
    }

    public setBanderes(banderes: number) {
        this.banderes = banderes;
    }

    public popUpToast(missatge: string) {
        let x = document.getElementById("toast");
        x.classList.remove("hidden");
        let m = document.getElementById("missatge");
        m.innerHTML = missatge;
        setTimeout(function () {
            x.classList.add("hidden");
        }, 3000);
    }

    //inicia el contador de temps
    public iniciarContador() {
        let segons = 0;
        let minuts = 0;
        let hores = 0;
        console.log(this.guanyat, this.perdut);


        setInterval(() => {
            console.log(this.guanyat, this.perdut);

            if (!this.guanyat && !this.perdut) {
                segons++;
                if (segons == 60) {
                    segons = 0;
                    minuts++;
                }
                if (minuts == 60) {
                    minuts = 0;
                    hores++;
                }
                if (minuts == 0) {
                    document.getElementById('temps').innerHTML = `${segons}`;
                } else if (minuts > 0 && hores == 0) {
                    document.getElementById('temps').innerHTML = `${minuts}:${segons}`;
                } else if (hores > 0) {
                    document.getElementById('temps').innerHTML = `${hores}:${minuts}:${segons}`;
                }
            }
        }, 1000);
    }
}