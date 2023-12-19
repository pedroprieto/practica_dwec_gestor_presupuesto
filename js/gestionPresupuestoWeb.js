import * as gestionPresupuesto from './gestionPresupuesto.js';
function mostrarDatoEnId(valor, idElemento) {
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}
function mostrarGastoWeb() {
    
}

function mostrarGastosAgrupadosWeb() {
    
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}