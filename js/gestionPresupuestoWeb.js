import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    let element = document.getElementById(idElemento);
    element.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let element = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";
    element.appendChild(divGasto);

    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divGasto.appendChild(divDescripcion);
    divDescripcion.innerHTML = gasto.descripcion;

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divGasto.appendChild(divValor);
    divValor.innerHTML = gasto.valor;

    let fechaFormateada = new Date(gasto.fecha).toISOString().substring(0,10);
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divGasto.appendChild(divFecha);
    divFecha.innerHTML = fechaFormateada;

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    divGasto.appendChild(divEtiquetas);

    for (let etiqueta of gasto.etiquetas) {
        let divEtiqueta = document.createElement("span");
        divEtiqueta.className = "gasto-etiquetas-etiqueta";
        divEtiquetas.appendChild(divEtiqueta);
        divEtiqueta.innerHTML = etiqueta;

        let borrarEtiqEvent = new BorrarEtiquetasHandle();
        borrarEtiqEvent.gasto = gasto;
        borrarEtiqEvent.etiqueta = etiqueta;
        divEtiqueta.addEventListener("click", borrarEtiqEvent);
    }

    let botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.className = "gasto-editar"
    botonEditar.innerHTML = "Editar";
    divGasto.append(botonEditar);
    let editarEvent = new EditarHandle();
    editarEvent.gasto = gasto;
    botonEditar.addEventListener("click", editarEvent);
    
    let botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.className = "gasto-borrar"
    botonBorrar.innerHTML = "Borrar";
    divGasto.append(botonBorrar);
    let borrarEvent = new BorrarHandle();
    borrarEvent.gasto = gasto;
    botonBorrar.addEventListener("click", borrarEvent); 

    let botonEditarFormulario = document.createElement("button");
    botonEditarFormulario.type = "button";
    botonEditarFormulario.className = "gasto-editar-formulario"
    botonEditarFormulario.innerHTML = "Editar (formulario)";
    divGasto.append(botonEditarFormulario);
    let editarFormularioEvent = new EditarHandleformulario();
    editarFormularioEvent.gasto = gasto;
    botonEditarFormulario.addEventListener("click", editarFormularioEvent);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let element = document.getElementById(idElemento);
    let periodoText;
    if(periodo == 'dia') {
        periodoText = 'día';
    } else if(periodo == 'anyo') {
        periodoText = 'año';
    } else {
        periodoText = periodo;
    }

    let html = `<div class="agrupacion">
    <h1>Gastos agrupados por ${periodoText}</h1>`;

    for (let agrupacion of Object.keys(agrup)) {
        html += `<div class="agrupacion-dato">
        <span class="agrupacion-dato-clave">${agrupacion}</span>
        <span class="agrupacion-dato-valor">${agrup[agrupacion]}</span>
      </div>`;
    }

    html += '</div>';
    element.innerHTML = html;
}

function repintar() {
    mostrarDatoEnId('presupuesto', gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gestionPresupuesto.calcularBalance());
    let element = document.getElementById('listado-gastos-completo');
    element.innerHTML = '';

    let listaGastos = gestionPresupuesto.listarGastos();
    for (let gasto of listaGastos) {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }
}

function actualizarPresupuestoWeb() {
    let newPresupuesto = prompt('Introduzca el nuevo presupuesto');
    gestionPresupuesto.actualizarPresupuesto(parseFloat(newPresupuesto));
    repintar();
}

function nuevoGastoWeb() {
    let descripcion = pedirDescripcionGasto();
    if(descripcion != null) {
        let valor = pedirValorGasto();
        if(valor != null) {
            let fechaStr = pedirFechaGasto();
            if(fechaStr != null) {
                let etiquetas = pedirEtiquetasGasto();
                if(etiquetas != null) {
                    let newGasto = etiquetas ? new gestionPresupuesto.CrearGasto(descripcion, valor, fechaStr, ...etiquetas) : new gestionPresupuesto.CrearGasto(descripcion, valor, fechaStr);
                    gestionPresupuesto.anyadirGasto(newGasto);
                }
            }
        }
    }
    repintar();
}

function EditarHandle() {
    this.handleEvent = function(e) {
        let descripcion = pedirDescripcionGasto(this.gasto.descripcion);
        if(descripcion != null) {
            let valor = pedirValorGasto(this.gasto.valor);
            if(valor != null) {
                let fechaStr = pedirFechaGasto(this.gasto.fecha);
                if(fechaStr != null) {
                    let etiquetas = pedirEtiquetasGasto();
                    if(etiquetas != null) {
                        this.gasto.actualizarDescripcion(descripcion);
                        this.gasto.actualizarFecha(fechaStr);
                        this.gasto.actualizarValor(valor);
                        this.gasto.anyadirEtiquetas(etiquetas);
                    }
                }
            }
        }

        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function(e) {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function(e) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function pedirDescripcionGasto(datoActual = "") {
    let descripcion = prompt('Introduzca la descripción', datoActual);
    return descripcion;
}

function pedirValorGasto(datoActual = "") {
    let valorStr = prompt('Introduzca el valor', datoActual);
    if(valorStr == null) {
        return null;
    }
    let valor = parseFloat(valorStr);
    return valor;
}

function pedirFechaGasto(datoActual) {
    let fechaLocale = datoActual ? new Date(datoActual).toISOString().substring(0,10) : "";
    let fechaStr = prompt('Introduzca la fecha en formato yyyy-mm-dd', fechaLocale);
    return fechaStr;
}

function pedirEtiquetasGasto(datoActual = "") {
    let etiquetasStr = prompt('Introduzca las etiquetas separadas por comas', datoActual);
    let etiquetas;
    if(etiquetasStr != "") {
        etiquetas = etiquetasStr.split(',');
    }
    return etiquetas;
}

function nuevoGastoWebFormulario(event) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    formulario.addEventListener("submit", submitGastoHandle);

    let botonCancelar = formulario.querySelector("button.cancelar");
    let cancelarGastoEvent = new CancelGastoHandle();
    cancelarGastoEvent.formulario = formulario;
    let botonAnyadirGastoFormulario = event.currentTarget;
    cancelarGastoEvent.botonAnyadir = botonAnyadirGastoFormulario;
    botonCancelar.addEventListener("click", cancelarGastoEvent);

    botonAnyadirGastoFormulario.disabled = true;

    let controles = document.getElementById("controlesprincipales")
    controles.append(formulario);
}

function submitGastoHandle(e){
    e.preventDefault();

    let formulario = e.currentTarget;
    let descripcion = formulario.elements.descripcion.value;
    let valorStr = formulario.elements.valor.value;
    let valor = parseFloat(valorStr);
    let fechaStr = formulario.elements.fecha.value;
    let etiquetasStr = formulario.elements.etiquetas.value;

    let etiquetas;
    if(etiquetasStr != "") {
        etiquetas = etiquetasStr.split(',');
    }

    let newGasto = etiquetas ? new gestionPresupuesto.CrearGasto(descripcion, valor, fechaStr, ...etiquetas) : new gestionPresupuesto.CrearGasto(descripcion, valor, fechaStr);
    gestionPresupuesto.anyadirGasto(newGasto);
    repintar();

    document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
}

function CancelGastoHandle(){
    this.handleEvent = function(e){
        this.botonAnyadir.removeAttribute("disabled");
        this.formulario.remove();
    }
}

function EditarHandleformulario() {
    this.handleEvent = function(e){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let submitGastoEditEvent = new SubmitGastoEditHandle();
        submitGastoEditEvent.gasto = this.gasto;
        formulario.addEventListener("submit", submitGastoEditEvent);

        let botonCancelar = formulario.querySelector("button.cancelar");
        let cancelarGastoEvent = new CancelGastoHandle();
        cancelarGastoEvent.formulario = formulario;
        let botonEditarFormulario = e.currentTarget;
        cancelarGastoEvent.botonAnyadir = botonEditarFormulario;
        botonCancelar.addEventListener("click", cancelarGastoEvent);

        botonEditarFormulario.after(formulario);
        botonEditarFormulario.disabled = true;
    }
}

function SubmitGastoEditHandle(e){
    this.handleEvent = function(e){
        e.preventDefault();

        let formulario = e.currentTarget;
        let descripcion = formulario.elements.descripcion.value;
        let valorStr = formulario.elements.valor.value;
        let valor = parseFloat(valorStr);
        let fechaStr = formulario.elements.fecha.value;
        let etiquetasStr = formulario.elements.etiquetas.value;

        let etiquetas;
        if(etiquetasStr != "") {
            etiquetas = etiquetasStr.split(',');
        }

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fechaStr);
        this.gasto.actualizarValor(valor);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    }
}

let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
let botonAnyadirGasto  = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);
let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}