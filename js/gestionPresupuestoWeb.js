function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).innerHTML = valor;
}

function crearElementoConTexto(tipo ,clase, texto) {
    let elemento = document.createElement(tipo);
    elemento.className = clase;
    let nodoTexto = document.createTextNode(texto);
    elemento.append(nodoTexto);
    return elemento;
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    let divPadre = document.createElement("div");
    divPadre.className = "gasto";
    
    let divGDescripcion = crearElementoConTexto("div", "gasto-descripcion", gasto.descripcion);
    divPadre.append(divGDescripcion);
    
    let fechaFormato = new Date(gasto.fecha)
    let divGFecha = crearElementoConTexto("div", "gasto-fecha", fechaFormato.toLocaleString());
    divPadre.append(divGFecha);

    let divGValor = crearElementoConTexto("div", "gasto-valor", gasto.valor);
    divPadre.append(divGValor);
    
    let divGEtiquetas = document.createElement("div");
    divGEtiquetas.className = "gasto-etiquetas";
    divPadre.append(divGEtiquetas);

    for (const etiqueta of gasto.etiquetas) {
        let spanEtiqueta = crearElementoConTexto("span", "gasto-etiquetas-etiqueta", etiqueta);
        divGEtiquetas.append(spanEtiqueta);
    }

    elemento.append(divPadre);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}