function mostrarDatoEnId(idElemento, valor) {
    const elem = document.querySelector(`#${idElemento}`);
    if (elem) {
        elem.innerHTML = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {   
    const elem = document.getElementById(idElemento);
    if (!elem) {
        return;
    }
    
    let divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    // descripción
    let divGastoDescripcion = document.createElement("div");
    divGastoDescripcion.classList.add("gasto-descripcion");
    divGastoDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divGastoDescripcion);

    // fecha
    let divGastoFecha = document.createElement("div");
    divGastoFecha.classList.add("gasto-fecha");
    divGastoFecha.textContent = gasto.fecha;
    divGasto.appendChild(divGastoFecha);

    // valor
    let divGastoValor = document.createElement("div");
    divGastoValor.classList.add("gasto-valor");
    divGastoValor.textContent = gasto.valor;
    divGasto.appendChild(divGastoValor);

    // etiquetas
    let divGastoEtiquetas = document.createElement("div");
    divGastoEtiquetas.classList.add("gasto-etiquetas");
    for (const etiqueta of gasto.etiquetas) {
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
        spanEtiqueta.textContent = etiqueta;
        divGastoEtiquetas.appendChild(spanEtiqueta);
    }
    divGasto.appendChild(divGastoEtiquetas);

    // agrego el divGasto al elemento
    elem.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elem = document.getElementById(idElemento);
    if (!elem) {
        return;
    }

    let divAgrupacion = document.createElement("div");
    divAgrupacion.classList.add("agrupacion");

    // h1
    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(h1);
    
    // cada gasto
    for (const clave in agrup) {
        let divDato = document.createElement("div");
        divDato.classList.add("agrupacion-dato");

        // Span con nombre propiedad
        let spanClave = document.createElement("span");
        spanClave.classList.add("agrupacion-dato-clave");
        spanClave.textContent = clave;
        divDato.appendChild(spanClave);

        // Span con valor propiedad
        let spanValor = document.createElement("span");
        spanValor.classList.add("agrupacion-dato-valor");
        spanValor.textContent = agrup[clave];
        divDato.appendChild(spanValor);

        // Agrego el dato al div principal
        divAgrupacion.appendChild(divDato);
    }

    // Agrego la estructura creada al elemento del html
    elem.appendChild(divAgrupacion);
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}