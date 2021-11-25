function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let gastoHTLM = document.createElement('div', {class: 'gasto'});
    document.getElementById(idElemento).append(gastoHTLM);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, agrupacion) {
    let agrupacionHTLM = document.createElement('div', {class: 'agrupacion'});
    document.getElementById(idElemento).innerHTML = agrupacionHTLM;
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}