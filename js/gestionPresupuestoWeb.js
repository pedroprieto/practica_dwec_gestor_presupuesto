function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.querySelector(`#${idElemento}`);
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