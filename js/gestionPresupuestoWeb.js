function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento)
    if (elemento) {
        elemento.textContent = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento)

    let divGasto = document.createElement("div");
    divGasto.classList.add("gasto");
    elemento.appendChild(divGasto);


    let divDescripcion = document.createElement("div");
    divDescripcion.classList.add("gasto-descripcion");
    divDescripcion.textContent = gasto.descripcion;
    elemento.appendChild(divDescripcion);

    let divGastoFecha = document.createElement("div");
    divGastoFecha.classList.add("gasto-fecha");
    divGastoFecha.textContent = gasto.fecha;
    divGasto.appendChild(divGastoFecha);

    let divValor = document.createElement("div");
    divValor.classList.add("gasto-valor");
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");
    divGasto.appendChild(divEtiquetas);

    gasto.etiquetas.forEach(etiquetas => {
        let etiquetaSpan = document.createElement("span");
        etiquetaSpan.classList.add("gasto-etiquetas-etiqueta");
        etiquetaSpan.textContent = etiquetas;
        divEtiquetas.appendChild(etiquetaSpan);
    })
}