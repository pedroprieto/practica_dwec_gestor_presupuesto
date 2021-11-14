import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    let element = document.getElementById(idElemento);
    element.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let html = `<div class="gasto">
    <div class="gasto-descripcion">${gasto.descripcion}</div>
    <div class="gasto-fecha">${gasto.fecha}</div> 
    <div class="gasto-valor">${gasto.valor}</div> 
    <div class="gasto-etiquetas">`;

    for (let etiqueta of gasto.etiquetas) {
        html += `<span class="gasto-etiquetas-etiqueta">
        ${etiqueta}
      </span>`;
    }

    html += `</div> 
    </div>
    `;

    let element = document.getElementById(idElemento);
    let htmlOrig = element.innerHTML;
    element.innerHTML = htmlOrig + html;
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
    let descripcion = prompt('Introduzca la descripción');

    let valorStr = prompt('Introduzca el valor');
    let valor = parseFloat(valorStr);

    let fechaStr = prompt('Introduzca la fecha en formato yyyy-mm-dd');

    let etiquetasStr = prompt('Introduzca las etiquetas separadas por comas');
    let etiquetas = etiquetasStr.split(',');

    let newGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fechaStr, etiquetas);
    gestionPresupuesto.anyadirGasto(newGasto);

    repintar();
}

let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto');
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
let botonAnyadirGasto  = document.getElementById('anyadirgasto');
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}