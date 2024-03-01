class Casella {
    esMina: boolean;
    revelada: boolean;
    marcada: boolean;

    constructor(defEsMina: boolean) {
        this.esMina = defEsMina;
        this.revelada = false;
        this.marcada = false;
    }

    //seters i geters
    public getRevelada() {
        return this.revelada;
    }
    public setRevelada(revelada: boolean) {
        this.revelada = revelada;
    }
    public getMarcada() {
        return this.marcada;
    }
    public setMarcada(marcada: boolean) {
        this.marcada = marcada;
    }
    public getEsMina() {
        return this.esMina;
    }
    public setEsMina(esMina: boolean) {
        this.esMina = esMina;
    }
}