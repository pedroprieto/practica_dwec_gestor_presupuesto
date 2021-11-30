import * as gestionPresupuesto from './gestionPresupuesto.js';

document.getElementById("actualizarpresupuesto").addEventListener("click", actualizarPresupuestoWeb);
document.getElementById("anyadirgasto").addEventListener("click", nuevoGastoWeb);
document.getElementById("anyadirgasto-formulario").addEventListener("click", nuevoGastoWebFormulario);

function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).innerHTML = valor;
}

function crearElementoConTextoYClase(tipo ,clase, texto, atributos = {}) {
    let elemento = document.createElement(tipo);
    elemento.className = clase;
    elemento.innerHTML = texto;

    for (const atributo in atributos) {
        elemento.setAttribute(atributo, atributos[atributo]);
    }

    return elemento;
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    let divPadre = document.createElement("div");
    divPadre.className = "gasto";
    
    let divGDescripcion = crearElementoConTextoYClase("div", "gasto-descripcion", gasto.descripcion);
    divPadre.append(divGDescripcion);
    
    let fechaFormato = new Date(gasto.fecha)
    let divGFecha = crearElementoConTextoYClase("div", "gasto-fecha", fechaFormato.toLocaleString());
    divPadre.append(divGFecha);

    let divGValor = crearElementoConTextoYClase("div", "gasto-valor", gasto.valor);
    divPadre.append(divGValor);
    
    let divGEtiquetas = document.createElement("div");
    divGEtiquetas.className = "gasto-etiquetas";
    divPadre.append(divGEtiquetas);

    for (const etiqueta of gasto.etiquetas) {
        let spanEtiqueta = crearElementoConTextoYClase("span", "gasto-etiquetas-etiqueta", etiqueta);
        divGEtiquetas.append(spanEtiqueta);
        
        let borrarEtiqueta = new BorrarEtiquetasHandle();
        borrarEtiqueta.gasto = gasto;
        borrarEtiqueta.etiqueta = etiqueta;
        spanEtiqueta.addEventListener("click", borrarEtiqueta);
    }

    let btnEditar = crearElementoConTextoYClase("button", "gasto-editar", "Editar", {"type": "button"});
    let editarGasto = new EditarHandle();
    editarGasto.gasto = gasto;
    btnEditar.addEventListener("click", editarGasto);
    divPadre.append(btnEditar);

    let btnBorrar = crearElementoConTextoYClase("button", "gasto-borrar", "Borrar", {"type": "button"});
    let borrarGasto = new BorrarHandle();
    borrarGasto.gasto = gasto;
    btnBorrar.addEventListener("click", borrarGasto);
    divPadre.append(btnBorrar);

    let btnEditarFormulario = crearElementoConTextoYClase("button", "gasto-editar-formulario", "Editar", {"type": "button"})
    let editarGastoFormulario = new EditarHandleFormulario();
    editarGastoFormulario.gasto = gasto;
    btnEditarFormulario.addEventListener("click", editarGastoFormulario);
    divPadre.append(btnEditarFormulario);

    let espacio = document.createElement("br");
    elemento.append(espacio);

    elemento.append(divPadre);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elemento = document.getElementById(idElemento);
    let divPadre = document.createElement("div");
    divPadre.className = "agrupacion";

    let h1grupo = document.createElement("h1");
    h1grupo.innerHTML = `Gastos agrupados por ${periodo}`;
    divPadre.append(h1grupo);

    for (const [clave, valor] of Object.entries(agrup)) {
        let divGEtiquetas = document.createElement("div");
        divGEtiquetas.className = "agrupacion-dato";
        divPadre.append(divGEtiquetas);

        let spanGClave = crearElementoConTextoYClase("span", "agrupacion-dato-clave", clave);
        let spanGValor = crearElementoConTextoYClase("span", "agrupacion-dato-valor", valor);
        divGEtiquetas.append(spanGClave);
        divGEtiquetas.append(spanGValor);
    }

    elemento.append(divPadre);
}

function repintar() {
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    gestionPresupuesto.listarGastos().forEach(function(gasto) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    });
}

function actualizarPresupuestoWeb() {
    let valor = prompt("Introduce un nuevo valor de presupuesto:");

    valor = Number(valor);

    gestionPresupuesto.actualizarPresupuesto(valor);
    repintar();
}

function nuevoGastoWeb() {
    let descripcion = prompt("Nuevo gasto: introduce una descripción:", "alquiler");
    let valor = prompt("Nuevo gasto: valor:", "650.00");
    let fecha = prompt("Nuevo gasto: fecha:", "2021-01-01");
    let etiquetas = prompt("Nuevo gasto: etiquetas", "fijo,casa");
    valor = Number(valor);
    let arrayEtiquetas = etiquetas.split(",");

    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);
    gestionPresupuesto.anyadirGasto(nuevoGasto);

    repintar();
}

function nuevoGastoWebFormulario(evento) {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let formulario = plantillaFormulario.querySelector("form");

    let btnAnyadirGasto = evento.currentTarget;
    btnAnyadirGasto.disabled = true;

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        let descripcion = formulario.descripcion.value;
        let valor = formulario.valor.value;
        let fecha = formulario.fecha.value;
        let etiquetas = formulario.etiquetas.value;
        let arrayEtiquetas = etiquetas.split(",");

        let gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);

        gestionPresupuesto.anyadirGasto(gasto);

        repintar();
    });

    let cancelarNuevoGasto = new CancelarNuevoGastoHandle();
    cancelarNuevoGasto.formulario = formulario;
    cancelarNuevoGasto.btnAnyadirGasto = btnAnyadirGasto;
    formulario.querySelector("button.cancelar").addEventListener("click", cancelarNuevoGasto);

    document.getElementById("controlesprincipales").append(formulario);
}

function EditarHandle() {
    this.handleEvent = function() {
        let descripcion = prompt("Nuevo gasto: introduce una descripción:", this.gasto["descripcion"]);
        let valor = prompt("Nuevo gasto: valor:", this.gasto["valor"]);
        valor = Number(valor);
        
        let fechaGasto = new Date(this.gasto["fecha"]);
        fechaGasto = fechaGasto.toISOString();
        let fecha = prompt("Nuevo gasto: fecha:", fechaGasto);
        
        let etiquetas = prompt("Nuevo gasto: etiquetas", this.gasto["etiquetas"].join(", "));
        let arrayEtiquetas = etiquetas.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...arrayEtiquetas);

        repintar();
    };
}

function BorrarHandle() {
    this.handleEvent = function() {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        
        repintar();
    };
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function() {
        this.gasto.borrarEtiquetas(this.etiqueta);
        
        repintar();
    };
}

function CancelarNuevoGastoHandle() {
    this.handleEvent = function() {
        this.formulario.remove();
        this.btnAnyadirGasto.disabled = false;
    };
}

function EditarHandleFormulario() {
    this.handleEvent = function(evento) {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        let btnEditar = evento.currentTarget;
        btnEditar.disabled = true;

        formulario.descripcion.value = this.gasto.descripcion;
        formulario.valor.value = this.gasto.valor;
        formulario.fecha.value = new Date(this.gasto.fecha).toISOString().substr(0,10);
        formulario.etiquetas.value = this.gasto["etiquetas"].join(", ");

        btnEditar.after(formulario);

        let enviarFormulario = new EnviarEditarHandleFormulario();
        enviarFormulario.gasto = this.gasto;
        enviarFormulario.formulario = formulario;
        formulario.addEventListener("submit", enviarFormulario);
    };
}

function EnviarEditarHandleFormulario() {
    this.handleEvent = function() {
        this.gasto.actualizarDescripcion(this.formulario.descripcion.value);
        this.gasto.actualizarValor(Number(this.formulario.valor.value));
        this.gasto.actualizarFecha(this.formulario.fecha.value);

        let etiquetas = this.formulario.etiquetas.value;
        let arrayEtiquetas = etiquetas.split(",");
        this.gasto.anyadirEtiquetas(...arrayEtiquetas);

        repintar();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}