function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {

    let divGasto = document.createElement('div');
    divGasto.className = 'gasto';
    
    let divGastoDescripcion = document.createElement('div');
    divGastoDescripcion.className = 'gasto-descripcion';
    divGastoDescripcion.textContent = gasto.descripcion;
    divGasto.append(divGastoDescripcion);

    let divGastoFecha = document.createElement('div');
    divGastoFecha.className = 'gasto-fecha';
//    divGastoFecha.textContent = new Date(gasto.fecha).toISOString().slice(0, 10);
    divGastoFecha.textContent = gasto.fecha;
    divGasto.append(divGastoFecha);

    let divGastoValor = document.createElement('div');
    divGastoValor.className = 'gasto-valor';
    divGastoValor.textContent = gasto.valor;
    divGasto.append(divGastoValor);

    let divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.className = 'gasto-etiquetas';
    
    for (let etiqueta of gasto.etiquetas) {
        let spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent = etiqueta;
        divGastoEtiquetas.append(spanEtiqueta);
    }

    divGasto.append(divGastoEtiquetas);

    document.getElementById(idElemento).append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = 'agrupacion';

    let h1Agrupacion = document.createElement('h1');
    h1Agrupacion.textContent = 'Gasto agrupados por ' + periodo;
    divAgrupacion.append(h1Agrupacion);

    for (let agrupacion of Object.entries(agrup)) {
        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.className = 'agrupacion-dato';

        let spanAgrupacionDatoClave = document.createElement('span');
        spanAgrupacionDatoClave.className = 'agrupacion-dato-clave';
        spanAgrupacionDatoClave.textContent = agrupacion[key];
        divAgrupacionDato.append(spanAgrupacionDatoClave);

        let spanAgrupacionDatoValor = document.createElement('span');
        spanAgrupacionDatoValor.className = 'agrupacion-dato-valor';
        spanAgrupacionDatoValor.textContent = agrupacion[value];
        divAgrupacionDato.append(spanAgrupacionDatoValor);

        divAgrupacion.append(divAgrupacionDato);
    }

    document.getElementById(idElemento).append(divAgrupacion);
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
