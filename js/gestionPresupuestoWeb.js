function mostrarDatoEnId(idElemento, valor) {
    document.querySelector(`#${idElemento}`).innerHTML = valor;
}

export {
    mostrarDatoEnId,
}