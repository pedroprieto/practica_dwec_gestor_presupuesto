import * as gestionPresupuesto from './gestionPresupuesto.js';

actualizarpresupuesto.addEventListener("click", actualizarPresupuestoWeb);
anyadirgasto.addEventListener("click", nuevoGastoWeb);

function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).innerHTML = valor;
}

function crearElementoConTextoYClase(tipo ,clase, texto) {
    let elemento = document.createElement(tipo);
    elemento.className = clase;
    elemento.innerHTML = texto;
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
    }

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

function EditarHandle() {
    gasto,

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
    gasto,

    this.handleEvent = function() {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        
        repintar();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}