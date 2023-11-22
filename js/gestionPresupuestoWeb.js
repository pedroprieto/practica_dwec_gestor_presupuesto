"use strict";
import * as gestionPresupuesto from './gestionPresupuesto.js';

export function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

export function mostrarGastoWeb(idElemento, gasto) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        const gastoElemento = document.createElement("div");
        gastoElemento.classList.add("gasto");

        const descripcionElemento = document.createElement("div");
        descripcionElemento.classList.add("gasto-descripcion");
        descripcionElemento.textContent = gasto.descripcion;
        gastoElemento.appendChild(descripcionElemento);

        const fechaElemento = document.createElement("div");
        fechaElemento.classList.add("gasto-fecha");
        fechaElemento.textContent = gasto.fecha;
        gastoElemento.appendChild(fechaElemento);

        const valorElemento = document.createElement("div");
        valorElemento.classList.add("gasto-valor");
        valorElemento.textContent = gasto.valor;
        gastoElemento.appendChild(valorElemento);

        const etiquetasElemento = document.createElement("div");
        etiquetasElemento.classList.add("gasto-etiquetas");
        gasto.etiquetas.forEach((etiqueta) => {
            const span = document.createElement("span");
            span.classList.add("gasto-etiquetas-etiqueta");
            span.textContent = etiqueta;
            span.addEventListener("click", new BorrarEtiquetasHandle(gasto, etiqueta));
            etiquetasElemento.appendChild(span);
        });
        gastoElemento.appendChild(etiquetasElemento);

        // Botón Editar
        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("gasto-editar");
        const editarHandler = new EditarHandle(gasto);
        btnEditar.addEventListener("click", editarHandler);
        gastoElemento.appendChild(btnEditar);

        // Botón Borrar
        const btnBorrar = document.createElement("button");
        btnBorrar.type = "button";
        btnBorrar.textContent = "Borrar";
        btnBorrar.classList.add("gasto-borrar");
        const borrarHandler = new BorrarHandle(gasto);
        btnBorrar.addEventListener("click", borrarHandler);
        gastoElemento.appendChild(btnBorrar);

        elemento.appendChild(gastoElemento);
    }
}

export function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        const agrupacionElemento = document.createElement("div");
        agrupacionElemento.classList.add("agrupacion");

        const h1Elemento = document.createElement("h1");
        h1Elemento.textContent = `Gastos agrupados por ${periodo}`;
        agrupacionElemento.appendChild(h1Elemento);

        Object.keys(agrup).forEach((clave) => {
            const datoElemento = document.createElement("div");
            datoElemento.classList.add("agrupacion-dato");

            const claveElemento = document.createElement("span");
            claveElemento.classList.add("agrupacion-dato-clave");
            claveElemento.textContent = clave;
            datoElemento.appendChild(claveElemento);

            const valorElemento = document.createElement("span");
            valorElemento.classList.add("agrupacion-dato-valor");
            valorElemento.textContent = agrup[clave];
            datoElemento.appendChild(valorElemento);

            agrupacionElemento.appendChild(datoElemento);
        });

        elemento.appendChild(agrupacionElemento);
    }
}

export function repintar() {
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    const elementoListadoGastosCompleto = document.getElementById("listado-gastos-completo");
    if (elementoListadoGastosCompleto) {
        elementoListadoGastosCompleto.innerHTML = "";
        const listadoGastosCompleto = gestionPresupuesto.listarGastos();
        listadoGastosCompleto.forEach((gasto) => mostrarGastoWeb("listado-gastos-completo", gasto));
    }
}

export function actualizarPresupuestoWeb() {
    const nuevoPresupuestoStr = prompt("Introduce el nuevo presupuesto:");
    const nuevoPresupuesto = parseFloat(nuevoPresupuestoStr);

    if (!isNaN(nuevoPresupuesto)) {
        gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
        repintar();
    } else {
        alert("Por favor, introduce un valor válido para el presupuesto.");
    }
}

export function nuevoGastoWeb() {
    const descripcion = prompt("Introduce la descripción del gasto:");
    const valorStr = prompt("Introduce el valor del gasto:");
    const valor = parseFloat(valorStr);
    const fecha = prompt("Introduce la fecha del gasto (formato YYYY-MM-DD):");
    const etiquetasStr = prompt("Introduce las etiquetas del gasto separadas por comas:");
    const etiquetas = etiquetasStr.split(",");

    if (!isNaN(valor) && gestionPresupuesto.validarFecha(fecha)) {
        const nuevoGasto = gestionPresupuesto.crearGasto(descripcion, valor, fecha, ...etiquetas);
        gestionPresupuesto.anyadirGasto(nuevoGasto);
        repintar();
    } else {
        alert("Por favor, introduce valores válidos para el gasto.");
    }
}

function EditarHandle(gasto) {
    this.gasto = gasto;
    this.handleEvent = function () {
        const descripcion = prompt("Introduce la nueva descripción del gasto:", this.gasto.descripcion);
        const valorStr = prompt("Introduce el nuevo valor del gasto:", this.gasto.valor);
        const fecha = prompt("Introduce la nueva fecha del gasto (formato YYYY-MM-DD):", this.gasto.fecha);
        const etiquetasStr = prompt("Introduce las nuevas etiquetas del gasto separadas por comas:", this.gasto.etiquetas.join(","));

        const nuevoValor = parseFloat(valorStr);
        const nuevasEtiquetas = etiquetasStr.split(",");

        if (!isNaN(nuevoValor) && gestionPresupuesto.validarFecha(fecha)) {
            gestionPresupuesto.actualizarGasto(this.gasto.id, descripcion, nuevoValor, fecha, ...nuevasEtiquetas);
            repintar();
        } else {
            alert("Por favor, introduce valores válidos para la edición del gasto.");
        }
    };
}

function BorrarHandle(gasto) {
    this.gasto = gasto;
    this.handleEvent = function () {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle(gasto, etiqueta) {
    this.gasto = gasto;
    this.etiqueta = etiqueta;
    this.handleEvent = function () {
        gestionPresupuesto.borrarEtiquetas(this.gasto.id, this.etiqueta);
        repintar();
    };
}
