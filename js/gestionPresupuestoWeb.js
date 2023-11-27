"use strict";

function mostrarDatoEnId (idElemento, valor){
    let dato = document.getElementById (idElemento);
    dato.textContent = valor;
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}