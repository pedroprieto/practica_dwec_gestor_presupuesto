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
        divGastoEtiquetas.appendChild(spanEtiqueta);
    }
    divGasto.appendChild(divGastoEtiquetas);

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


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}