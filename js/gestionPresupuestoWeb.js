"use strict"
import * as gestion from './gestionPresupuesto.js'

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
};
debugger;
let botonActualizar = document.getElementById('actualizarpresupuesto');
let botonAnyadirGasto = document.getElementById('anyadirgasto');

function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).append(valor);
}

function mostrarGastoWeb(idElemento, gasto) {
    let divBloque = document.createElement('div');
    divBloque.className = 'gasto';

    let divDescr = document.createElement('div');
    divDescr.className = 'gasto-descripcion';
    divDescr.innerHTML = gasto.descipcion;

    let divFecha = document.createElement('div');
    divFecha.className = 'gasto-fecha';
    divFecha.innerHTML = gasto.fecha;

    let divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.innerHTML = gasto.valor;

    divBloque.prepend(divDescr);
    divBloque.prepend(divFecha);
    divBloque.prepend(divValor);

    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas';

    if (gasto.etiquetas) {
        for (let etiqueta of gasto.etiquetas) {
            let span = document.createElement('span');
            span.className = 'gasto-etiquetas-etiqueta';
            span.innerHTML = etiqueta;
            divEtiquetas.prepend(span);
        }
    }
    divBloque.prepend(divEtiquetas);
    
    let botonEditar = document.createElement('button');
    botonEditar.className = 'gasto-editar';
    // botonEditar.type = 'button';
    botonEditar.innerText = 'Editar';
    divBloque.prepend(botonEditar);

    let botonBorrar = document.createElement('button');
    botonEditar.className = 'gasto-borrar';
    // botonEditar.type = 'button';
    botonEditar.innerText = 'Borrar';
    divBloque.prepend(botonEditar);

    mostrarDatoEnId(idElemento, divBloque);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    debugger;
    let divBloque = document.createElement('div');
    divBloque.className = 'agrupacion';

    let titulo = document.createElement('h1');
    titulo.innerHTML = `Gastos agrupados por ${periodo}`;
    divBloque.prepend(titulo);

    for (let grupo in agrup) {
        let divAgrupacion = document.createElement('div');
        divAgrupacion.className = 'agrupacion-dato';

        let span1 = document.createElement('span');
        span1.className = 'agrupacion-dato-clave';
        span1.innerHTML = grupo[0];
        divAgrupacion.prepend(span1);

        let span2 = document.createElement('span');
        span2.className = 'agrupacion-dato-valor';
        span2.innerHTML = grupo[1];
        divAgrupacion.prepend(span2);

        divBloque.prepend(divAgrupacion);
    }

    mostrarDatoEnId(idElemento, divBloque);
}

function repintar() {
    mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestion.calcularBalance());
    // Borrar los datos de listado-gastos-completo. 
    document.getElementById("listado-gastos-completo").innerHTML = "";
    for (let gasto of gestion.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb(){
    debugger;
    let presupuesto = prompt('Indica el presupuesto: ');
    gestion.actualizarPresupuesto(parseInt(presupuesto));
    repintar();
}

function nuevoGastoWeb(){
    debugger;
    let descripcion = prompt('Indica la descripción del gasto: ');
    let valor = parseInt(prompt('Indica el valor: '));
    let fecha = prompt('Indica la fecha (Formato yyyy-mm-dd): ');
    let etiquetas = prompt('Indica las etiquetas del gasto separadas por coma: ');

    let etiquetasSplit = etiquetas.split(',');
    let gasto = new gestion.CrearGasto(descripcion,valor,fecha,...etiquetasSplit);
    gestion.anyadirGasto(gasto);
    repintar();
}

botonActualizar.addEventListener("click",actualizarPresupuestoWeb);
botonAnyadirGasto.addEventListener("click",nuevoGastoWeb);

function EditarHandle(){

}