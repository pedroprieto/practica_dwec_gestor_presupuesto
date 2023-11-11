function mostrarDatoEnId(idElemento, valor) {
    const elem = document.querySelector(`#${idElemento}`)
    if (elem) {
        elem.innerHTML = valor;
    }
}

export {
    mostrarDatoEnId,
}