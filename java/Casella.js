"use strict";
class Casella {
    constructor(defEsMina) {
        this.esMina = defEsMina;
        this.revelada = false;
        this.marcada = false;
    }
    //seters i geters
    getRevelada() {
        return this.revelada;
    }
    setRevelada(revelada) {
        this.revelada = revelada;
    }
    getMarcada() {
        return this.marcada;
    }
    setMarcada(marcada) {
        this.marcada = marcada;
    }
    getEsMina() {
        return this.esMina;
    }
    setEsMina(esMina) {
        this.esMina = esMina;
    }
}
