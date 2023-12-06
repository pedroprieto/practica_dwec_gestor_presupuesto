import * as gestion from './gestionPresupuesto.js';

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
        let borrarEtiquetaHandle = new BorrarEtiquetasHandle(gasto, etiqueta);
        spanEtiqueta.addEventListener("click", borrarEtiquetaHandle);

        divGastoEtiquetas.appendChild(spanEtiqueta);
    }
    divGasto.appendChild(divGastoEtiquetas);
    
    // boton editar
    let botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.type = "button";
    botonEditar.classList.add("gasto-editar");
    let editarHandle = new EditarHandle(gasto);
    botonEditar.addEventListener("click", editarHandle);
    divGasto.appendChild(botonEditar);

    // boton borrar
    let botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";
    botonBorrar.type = "button";
    botonBorrar.classList.add("gasto-borrar");
    let borrarHandle = new BorrarHandle(gasto);
    botonBorrar.addEventListener("click", borrarHandle);
    divGasto.appendChild(botonBorrar);

    let botonEditarFormulario = document.createElement("button");
    botonEditarFormulario.textContent = "Editar (formulario)";
    botonEditarFormulario.type = "button";
    botonEditarFormulario.classList.add("gasto-editar-formulario");
    let editarFormularioHandle = new EditarHandleFormulario(gasto);
    botonEditarFormulario.addEventListener("click", editarFormularioHandle);
    divGasto.appendChild(botonEditarFormulario);

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

function repintar() {
    mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestion.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";
    gestion.listarGastos().forEach(gasto =>
        mostrarGastoWeb("listado-gastos-completo", gasto)
    );
}

function actualizarPresupuestoWeb() {
    const presupuesto = Number(prompt("Introduzca el nuevo presupuesto: "));
    gestion.actualizarPresupuesto(presupuesto);
    
    repintar();
}

const botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    const descripcion = prompt("Descripcion");
    const valor = Number(prompt("Valor"));
    const fecha = prompt("Fecha (yyyy-mm-dd)");
    let etiquetas = prompt("Etiquetas (lista separada por comas)");
    etiquetas = etiquetas.split(",");

    const gasto = new gestion.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestion.anyadirGasto(gasto);

    repintar();
}

const botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle(gasto) {
    this.gasto = gasto;

    this.handleEvent = function () {
        const descripcion = prompt("Descripcion", this.gasto.descripcion);
        const valor = Number(prompt("Valor", this.gasto.valor));
        const fecha = prompt("Fecha (yyyy-mm-dd)", this.gasto.fecha);
        let etiquetas = prompt("Etiquetas (lista separada por comas)", this.gasto.etiquetas);
        etiquetas = etiquetas.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    }
}

function BorrarHandle(gasto) {
    this.gasto = gasto;

    this.handleEvent = function () {
        gestion.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle(gasto, etiqueta) {
    this.gasto = gasto;
    this.etiqueta = etiqueta;

    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(etiqueta);

        repintar();
    }
}

function submitFormularioHandler(e) {
    e.preventDefault();
    const formulario = e.currentTarget;

    const descripcion = formulario.elements.descripcion.value;
    const valor = Number(formulario.elements.valor.value);
    const fecha = formulario.elements.fecha.value;
    let etiquetas = formulario.elements.etiquetas.value;
    etiquetas = etiquetas.split(",");

    const gasto = new gestion.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestion.anyadirGasto(gasto);

    repintar();

    document.getElementById("anyadirgasto-formulario").removeAttribute("disabled");
}

function CancelarHandle(formulario, botonAnyadirGasto) {
    this.formulario = formulario;
    this.botonAnyadirGasto = botonAnyadirGasto;

    this.handleEvent = function () {
        formulario.remove();
        botonAnyadirGasto.removeAttribute("disabled");
    }
}

function nuevoGastoWebFormulario(e) {
    let boton = e.currentTarget;
    const plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    const formulario = plantillaFormulario.querySelector("form");
    formulario.addEventListener("submit", submitFormularioHandler);
    const botonCancelar = formulario.querySelector("button.cancelar");
    const cancelarHandle = new CancelarHandle(formulario, boton);
    botonCancelar.addEventListener("click", cancelarHandle);

    boton.setAttribute("disabled", "");
    document.getElementById("controlesprincipales").appendChild(formulario);
}

document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);


function SubmitEditarHandleFormulario(gasto) {
    this.gasto = gasto;

    this.handleEvent = function (e) {
        e.preventDefault();
        const formulario = e.currentTarget;
    
        const descripcion = formulario.elements.descripcion.value;
        const valor = Number(formulario.elements.valor.value);
        const fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;
        etiquetas = etiquetas.split(",");
    
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);
    
        repintar();
    }
}

function EditarHandleFormulario(gasto) {
    this.gasto = gasto;

    this.handleEvent = function (e) {
        let boton = e.currentTarget;
        const plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        const formulario = plantillaFormulario.querySelector("form");
        
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.obtenerPeriodoAgrupacion("dia");
        formulario.elements.etiquetas.value = this.gasto.etiquetas.join(",");
        
        const submitEditarHandleFormulario = new SubmitEditarHandleFormulario(gasto);
        formulario.addEventListener("submit", submitEditarHandleFormulario);
        const botonCancelar = formulario.querySelector("button.cancelar");

        const cancelarHandle = new CancelarHandle(formulario, boton);
        botonCancelar.addEventListener("click", cancelarHandle);
    
        boton.setAttribute("disabled", "");
        boton.after(formulario);
    }
}

function filtrarGastosWeb(event) {
    event.preventDefault();
    const elements = event.currentTarget.elements;
    const etiquetas = gestion.transformarListadoEtiquetas(elements["formulario-filtrado-etiquetas-tiene"].value);
    const parametros = {
        fechaDesde: elements["formulario-filtrado-fecha-desde"].value,
        fechaHasta: elements["formulario-filtrado-fecha-hasta"].value,
        valorMinimo: elements["formulario-filtrado-valor-minimo"].value && Number(elements["formulario-filtrado-valor-minimo"].value),
        valorMaximo: elements["formulario-filtrado-valor-maximo"].value && Number(elements["formulario-filtrado-valor-maximo"].value),
        descripcionContiene: elements["formulario-filtrado-descripcion"].value,
        etiquetasTiene: etiquetas,
    };
    document.getElementById("listado-gastos-completo").innerHTML = "";
    gestion.filtrarGastos(parametros).forEach(gasto => mostrarGastoWeb("listado-gastos-completo", gasto));
}   

document.getElementById("formulario-filtrado").addEventListener("submit", filtrarGastosWeb);

function guardarGastosWeb() {
    localStorage.GestorGastosDWEC = JSON.stringify(gestion.listarGastos());
}

document.getElementById("guardar-gastos").addEventListener("click", guardarGastosWeb);


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}