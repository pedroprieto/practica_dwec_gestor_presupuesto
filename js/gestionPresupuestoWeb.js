function mostrarDatoEnId(idElemento, valor) {
    
    console.log(document.getElementById(idElemento).innerHTML = valor);

    return document.getElementById(idElemento).innerHTML = valor;

}

function mostrarGastoWeb(idElemento, gasto) {
    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup) {
    
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}