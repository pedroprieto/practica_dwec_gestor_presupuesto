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

function mostrarDatosAgrupadosWeb(idElemento, agrup, periodo) {
    let elemento = document.getElementById(idElemento)

    let divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");
    elemento.appendChild(divAgrupacion);

    let titulo = document.createElement("h1");
    titulo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(titulo);

    for (let agrupacion in agrup) {
        if(agrup.hasOwnProperty(agrupacion)){
            let divAgrupacionDato = document.createElement("div");
        divAgrupacionDato.classList.add("agrupacion-dato")

        let spanDatoClave = document.createElement("span");
        spanDatoClave.classList.add("agrupacion-dato-clave");
        spanDatoClave.textContent = agrupacion;
        divAgrupacionDato.appendChild(spanDatoClave);

        let spanDatoValor = document.createElement("span");
        spanDatoValor.classList.add("agrupacion-dato-valor");
        spanDatoValor.textContent = agrup[agrupacion];
        divAgrupacionDato.appendChild(spanDatoValor);
        
        divAgrupacion.appendChild(divAgrupacionDato);
        }      
    }
}

export{
    mostrarDatosAgrupadosWeb,
    mostrarDatoEnId,
    mostrarGastoWeb
}