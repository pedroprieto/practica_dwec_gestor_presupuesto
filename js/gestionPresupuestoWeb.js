function mostrarDatoEnId(idElemento, valor) {
    let id = document.getElementById(idElemento);
    id.document.write(valor);
}

function mostrarGastoWeb(idElemento, gasto) {
    let id = document.getElementById(idElemento);
    id.document.write(gasto);
}

function mostrarGastosAgrupadosWeb() {
    
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}