function mostrarDatoEnId(idElemento, valor) {
    return document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gastos) {

    let divElemento = document.getElementById(idElemento);

    for (let gasto of gastos) {
        //Crear los divs y elementos necesarios
        let div = document.createElement('div');
        div.className = 'gasto';
        let divDescripcion = document.createElement('div');
        divDescripcion.className = 'gasto-descripcion';
        let divFecha = document.createElement('div');
        divFecha.className = 'gasto-fecha';
        let divValor = document.createElement('div');
        divValor.className = 'gasto-valor';
        let divEtiquetas = document.createElement('div');
        divEtiquetas.className = 'gasto-etiquetas';

        //Insertarlos con su contenido
        divElemento.append(div);
        div.append(divDescripcion);
        divDescripcion.innerHTML = gasto.descripcion;
        div.append(divFecha);
        divFecha.innerHTML = gasto.fecha;
        div.append(divValor);
        divValor.innerHTML = gasto.valor;
        div.append(divEtiquetas);
        for (let etiqueta of gasto.etiquetas) {
            let spanEtiqueta = document.createElement('span');
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            divEtiquetas.append(`${etiqueta},`);
            divEtiquetas.append(spanEtiqueta);
        }
    }



}

function mostrarGastosAgrupadosWeb(idElemento, agrup) {
    
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}