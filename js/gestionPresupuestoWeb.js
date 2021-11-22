"use strict"

import * as gestion from './gestionPresupuesto.js'

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle,
};
let botonActualizar = document.getElementById('actualizarpresupuesto');
let botonAnyadirGasto = document.getElementById('anyadirgasto');
let botonAnyadirGastoForm = document.getElementById('anyadirgasto-formulario');
let botonFiltrarGastos = document.getElementById('formulario-filtrado');
let botonGuardarGastos = document.getElementById('guardar-gastos');
let botonCargarGastos = document.getElementById('cargar-gastos');

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    // elemento.innerHTML = "";
    elemento.append(valor);
}

function mostrarGastoWeb(idElemento, gasto) {
    let divBloque = document.createElement('div');
    divBloque.className = 'gasto';

    let divDescr = document.createElement('div');
    divDescr.className = 'gasto-descripcion';
    divDescr.innerHTML = gasto.descripcion;

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
            let objBorradoEtiquetas = new BorrarEtiquetasHandle();
            objBorradoEtiquetas.gasto = gasto;
            objBorradoEtiquetas.etiqueta = etiqueta;
            span.addEventListener('click', objBorradoEtiquetas);
            divEtiquetas.prepend(span);
        }
    }
    divBloque.prepend(divEtiquetas);

    let botonEditar = document.createElement('button');
    botonEditar.className = 'gasto-editar';
    botonEditar.innerText = 'Editar';
    let objEditar = new EditarHandle();
    objEditar.gasto = gasto;
    botonEditar.addEventListener("click", objEditar);
    divBloque.prepend(botonEditar);

    let botonBorrar = document.createElement('button');
    botonBorrar.className = 'gasto-borrar';
    botonBorrar.innerText = 'Borrar';
    let objBorrar = new BorrarHandle();
    objBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", objBorrar);
    divBloque.prepend(botonBorrar);

    let botonEditarForm = document.createElement('button');
    botonEditarForm.className = 'gasto-editar-formulario';
    botonEditarForm.innerText = 'Editar (formulario)';
    let objEditarForm = new EditarHandleFormulario();
    objEditarForm.gasto = gasto;
    botonEditarForm.addEventListener("click", objEditarForm);
    divBloque.prepend(botonEditarForm);

    mostrarDatoEnId(idElemento, divBloque);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
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
    debugger;
    mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestion.calcularBalance());
    // Borrar los datos de listado-gastos-completo. 
    document.getElementById("listado-gastos-completo").innerHTML = "";
    let listaGastos = gestion.listarGastos();
    for (let gasto of gestion.listarGastos()) {
        // if(gasto.length > 0){
            mostrarGastoWeb("listado-gastos-completo", gasto);
        // }
    }
}

function actualizarPresupuestoWeb() {
    let presupuesto = prompt('Indica el presupuesto: ');
    gestion.actualizarPresupuesto(parseInt(presupuesto));
    repintar();
}

function nuevoGastoWeb() {
    let descripcion = prompt('Indica la descripción del gasto: ');
    let valor = parseFloat(prompt('Indica el valor: '));
    let fecha = prompt('Indica la fecha (Formato yyyy-mm-dd): ');
    let etiquetas = prompt('Indica las etiquetas del gasto separadas por coma: ');

    let etiquetasSplit = etiquetas.split(',');
    let gasto = new gestion.CrearGasto(descripcion, valor, fecha, ...etiquetasSplit);
    gestion.anyadirGasto(gasto);
    repintar();
}

function nuevoGastoWebFormulario(event) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    formulario.addEventListener("submit", anyadirNuevoGastoFormulario);
    let cancelarHandle = new cancelarFormulario();
    cancelarHandle.formulario = formulario;
    cancelarHandle.botonSubmit = event.currentTarget;
    let botonCancelar = formulario.querySelector("button.cancelar");
    botonCancelar.addEventListener("click", cancelarHandle);
    document.getElementById('controlesprincipales').append(formulario);
    document.getElementById("anyadirgasto-formulario").disabled = true;
}


function anyadirNuevoGastoFormulario(event) {
    event.preventDefault();
    let formulario = event.currentTarget;
    // Obtenemos los datos del formulario y creamos un gasto con ellos.
    let etiquetasSplit = formulario.elements.etiquetas.value.split(',');
    let gasto = etiquetasSplit.length > 0 ? new gestion.CrearGasto(formulario.elements.descripcion.value, parseFloat(formulario.elements.valor.value), formulario.elements.fecha.value, ...etiquetasSplit) : new gestion.CrearGasto(formulario.elements.descripcion.value, formulario.elements.valor.value, formulario.elements.fecha.value);
    gestion.anyadirGasto(gasto);
    repintar();
    document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
}

function cancelarFormulario() {
    this.handleEvent = function (evento) {
        debugger;
        this.botonSubmit.removeAttribute("disabled");
        this.formulario.remove();
    }
}

botonActualizar.addEventListener("click", actualizarPresupuestoWeb);
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);
botonAnyadirGastoForm.addEventListener("click", nuevoGastoWebFormulario);
botonFiltrarGastos.addEventListener("submit", filtrarGastosWeb);
botonGuardarGastos.addEventListener("click",guardarGastosWeb);
botonCargarGastos.addEventListener("click",cargarGastosWeb);


function EditarHandle() {
    this.handleEvent = function (evento) {
        let descripcion = prompt('Indica la descripción del gasto: ');
        let valor = parseFloat(prompt('Indica el valor: '));
        let fecha = prompt('Indica la fecha (Formato yyyy-mm-dd): ');
        let etiquetas = prompt('Indica las etiquetas del gasto separadas por coma: ');
        let etiquetasSplit = etiquetas.split(',');
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetasSplit);
        repintar();
    }
}

function EditarHandleFormulario() {
    this.handleEvent = function (evento) {
        debugger;
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0, 10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;
        let enviarGastoEditado = new EnviarGastoEditadoFormulario();
        enviarGastoEditado.gasto = this.gasto;
        formulario.addEventListener("submit", enviarGastoEditado);
        let botonCancelarEdicion = formulario.querySelector("button.cancelar");
        let cancelarEdicion = new cancelarFormulario();
        cancelarEdicion.formulario = formulario;
        cancelarEdicion.botonSubmit = evento.currentTarget;
        botonCancelarEdicion.addEventListener("click", cancelarEdicion);
        let botonEditarFormulario = evento.currentTarget;
        botonEditarFormulario.after(formulario);
        botonEditarFormulario.disabled = true;
    }
}


function EnviarGastoEditadoFormulario() {
    this.handleEvent = function (evento) {
        debugger;
        evento.preventDefault();
        let formulario = evento.currentTarget;
        this.gasto.actualizarDescripcion(formulario.elements.descripcion.value);
        this.gasto.actualizarValor(parseFloat(formulario.elements.valor.value));
        this.gasto.actualizarFecha(formulario.elements.fecha.value);

        let etiquetasSplit = formulario.elements.etiquetas.value;
        this.gasto.anyadirEtiquetas(...etiquetasSplit);
        repintar();

    }
}

function BorrarHandle() {
    this.handleEvent = function (evento) {
        gestion.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (evento) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function filtrarGastosWeb(event) {
    debugger;
    event.preventDefault();
    let formularioDiv = document.getElementById('filtrar-gastos');
    var formulario = formularioDiv.querySelector("form");
    // Una vez tenemos el formulario, vamos a comenzar a extraer los campos por los que vamos a filtrar
    let objeto = {};
    formulario.elements[0].value != "" ? objeto.descripcionContiene = formulario.elements[0].value : null;
    formulario.elements[1].value != "" ? objeto.valorMinimo = parseFloat(formulario.elements[1].value) : null;
    formulario.elements[2].value != "" ? objeto.valorMaximo = parseFloat(formulario.elements[2].value) : null;
    formulario.elements[3].value != "" ? objeto.fechaDesde = new Date(formulario.elements[3].value).toISOString().substr(0, 10) : null;
    formulario.elements[4].value != "" ? objeto.fechaHasta = new Date(formulario.elements[4].value).toISOString().substr(0, 10) : null;
    if (formulario.elements[5].value != "") {
        let listaEtiquetas = gestion.transformarListadoEtiquetas(formulario.elements[5].value);
        objeto.etiquetasTiene = listaEtiquetas;
    }
    document.getElementById("listado-gastos-completo").innerHTML = "";
    for (let gasto1 of gestion.filtrarGastos(objeto)) {
        mostrarGastoWeb("listado-gastos-completo", gasto1);
    }
}

function guardarGastosWeb(){
    debugger;
    localStorage.GestorGastosDWEC = JSON.stringify(gestion.listarGastos());
}

function cargarGastosWeb(){
    debugger;
    let datos = [];
    if(typeof(localStorage.GestorGastosDWEC) != "undefined"){
        document.getElementById("listado-gastos-completo").innerHTML = "";
        datos = JSON.parse(localStorage.GestorGastosDWEC);
        gestion.cargarGastos(datos);

    } else{
        document.getElementById("listado-gastos-completo").innerHTML = "";
        gestion.cargarGastos(datos);
    }
    repintar();
}
