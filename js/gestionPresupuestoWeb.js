import * as gp from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.querySelector(`#${idElemento}`);
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.querySelector(`#${idElemento}`);
    let texto = `
        <div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${(new Date(gasto.fecha)).toLocaleString()}</div> 
            <div class="gasto-valor">${gasto.valor} €</div> 
            <div class="gasto-etiquetas">
                ${gasto.etiquetas.map(etiqueta => `
                    <span class="gasto-etiquetas-etiqueta">
                        ${etiqueta}
                    </span>
                `).join("\n")}
            </div> 
        </div>`;
    elemento.innerHTML += texto;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elemento = document.querySelector(`#${idElemento}`);
    let texto = `
        <div class="agrupacion">
            <h1>Gastos agrupados por ${periodo}</h1>
                ${Object.entries(agrup).map(propiedad => `
                    <div class="agrupacion-dato">
                        <span class="agrupacion-dato-clave">${propiedad[0]}</span>
                        <span class="agrupacion-dato-valor">${propiedad[1]}</span>
                    </div>
                `).join("\n")}     
        </div>`;
    elemento.innerHTML += texto;
}

function repintar() {    
    mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());

    mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos().toFixed(2));

    mostrarDatoEnId("balance-total", gp.calcularBalance().toFixed(2));

    document.getElementById("listado-gastos-completo").innerHTML = "";
    for (const gasto of gp.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {
    let presupuesto = Number(prompt("Introduzca presupuesto: "));
    gp.actualizarPresupuesto(presupuesto);
    repintar();
}

let boton1 = document.getElementById("actualizarpresupuesto");
boton1.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt("Introduzca una descripción: ");
    let valor = Number(prompt("Introduzca valor: "));
    let fecha = prompt("Introduzca fecha en formato yyyy-mm-dd: ");
    let etiquetas = prompt("Introduzca etiquetas separadas por comas: ");
    etiquetas = etiquetas.split(",");
    let gasto = new gp.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gp.anyadirGasto(gasto);
    repintar();
}

let boton2 = document.getElementById("anyadirgasto");
boton2.addEventListener("click", nuevoGastoWeb);

function EditarHandle(gasto) {
    this.gasto = gasto;

    this.handleEvent = function() {
        let descripcion = prompt("Introduzca una descripción: ", this.gasto.descripcion);
        let valor = Number(prompt("Introduzca valor: ", this.gasto.valor));
        let fecha = prompt("Introduzca fecha en formato yyyy-mm-dd: ", this.gasto.obtenerPeriodoAgrupacion("dia"));
        let etiquetas = prompt("Introduzca etiquetas separadas por comas: ", this.gasto.etiquetas.join(","));
        etiquetas = etiquetas.split(",");
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();
    }
}

function BorrarHandle(gasto) {
    this.gasto = gasto;

    this.handleEvent = function() {
        gp.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle(gasto, etiqueta) {
    this.gasto = gasto;
    this.etiqueta = etiqueta;
    
    this.handleEvent = function() {
        this.gasto.borrarEtiquetas(etiqueta);
        repintar();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}