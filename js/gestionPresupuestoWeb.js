"use strict";

function mostrarDatoEnId (idElemento, valor){
    let dato = document.getElementById (idElemento);
    dato.textContent = valor;
}

function mostrarGastoWeb(){

}

function mostrarGastosAgrupadosWeb() {

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}