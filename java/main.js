"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const joc = new Joc(8, 8, 10);
    joc.dibuixarTauler();
});
document.getElementById('dificultat').addEventListener('change', (event) => {
    const dificultatSeleccionada = event.target.value;
    console.log(dificultatSeleccionada);
    let files, columnes, mines;
    switch (dificultatSeleccionada) {
        case 'facil':
            files = 8;
            columnes = 8;
            mines = 10;
            break;
        case 'mitja':
            files = 12;
            columnes = 12;
            mines = 15;
            break;
        case 'dificil':
            files = 16;
            columnes = 16;
            mines = 20;
            break;
    }
    const joc = new Joc(files, columnes, mines);
    joc.dibuixarTauler();
});
// joc.dibuixarTaulerConsola();
document.getElementById('reiniciar').addEventListener('click', () => {
    // joc.reiniciarJoc();
    location.reload();
});
