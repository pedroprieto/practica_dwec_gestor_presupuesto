import * as gestionPresupuesto from './gestionPresupuesto.js';

let btnActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
    btnActualizarPresupuesto.addEventListener('click', actualizarPresupuestoWeb);

function actualizarPresupuestoWeb() {
    let cantidad = prompt('Introduce una cantidad');
    parseFloat(cantidad);
    gestionPresupuesto.actualizarPresupuesto(cantidad);
    repintar();
}

function mostrarDatoEnId(idElemento, valor) {
    return document.getElementById(idElemento).innerHTML = valor;
}

function repintar() {
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
    let listado = document.getElementById('listado-gastos-completo');
    listado.innerHTML = "";
    mostrarGastoWeb('listado-gastos-completo', gestionPresupuesto.listarGastos());
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

function mostrarGastosAgrupadosWeb(idElemento, periodo, agrup) {

    let divElemento = document.getElementById(idElemento);

    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = 'agrupacion';
    let h1Agrupacion = document.createElement('h1');
    h1Agrupacion.innerHTML = 'Gastos agrupados por ' + periodo;
    divElemento.append(divAgrupacion);
    divAgrupacion.append(h1Agrupacion);

    for (let [clave, valor] of Object.entries(agrup)) {

        let divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.className = 'agrupacion-dato';
        let spanAgrupacionClave = document.createElement('span');
        spanAgrupacionClave.className = 'agrupacion-dato-clave';
        let spanAgrupacionValor = document.createElement('span');
        spanAgrupacionValor.className = 'agrupacion-dato-valor';

        spanAgrupacionClave.innerHTML = 'Fecha: ' + clave + " ";
        spanAgrupacionValor.innerHTML = 'Valor: ' + valor;

        divAgrupacion.append(divAgrupacionDato);
        divAgrupacionDato.append(spanAgrupacionClave);
        divAgrupacionDato.append(spanAgrupacionValor);

    }

    
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}