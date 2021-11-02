"use strict";

import * as gp from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    let mostrar = document.getElementById(idElemento);
    mostrar.innerHTML = `${valor}`;
}

function mostrarGastoWeb(idElemento, gasto){

    let mostrar = document.getElementById(idElemento);
    let txtEtiquetas = "";

    for(let etiqueta of gasto.etiquetas){
        txtEtiquetas += `
                <span class="gasto-etiquetas-etiqueta">
                    ${etiqueta}
                </span>       
        `;
    }

    mostrar.innerHTML += 
        `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div>
            <div class="gasto-etiquetas">
            ${txtEtiquetas}
            </div>
            </div>
        `;
    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let mostrar = document.getElementById(idElemento);
    let txtEtiquetas = "";

    for(const [key, value] of Object.entries(agrup)){
        txtEtiquetas += `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${key}</span>
            <span class="agrupacion-dato-valor">${value}</span>  
        </div>
        `;
    }

    mostrar.innerHTML = `
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${txtEtiquetas}
    </div>
`;

}

function repintar(){
    let presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let gTotales = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gTotales);

    let bTotal = gp.calcularBalance();
    mostrarDatoEnId("balance-total", bTotal);

    document.getElementById("listado-gastos-completo").innerHTML = '';

    let lgastos = gp.listarGastos();

    for(let gasto of lgastos){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb(){
    let presupuesto = prompt('Introduce un presupuesto nuevo');
    presupuesto = parseInt(presupuesto);

    gp.actualizarPresupuesto(presupuesto);

    repintar();
}

function nuevoGastoWeb(){
    let descripcion = prompt('Introduce la descripción del gasto');
    let valor = prompt('Introduce el valor del gasto');
    let fecha = prompt('Introduce la fecha del gasto');
    let etiquetas = prompt('Introduce las etiquetas');

    valor = parseFloat(valor);
    etiquetas = etiquetas.split(',');

    let gasto1 = new gp.CrearGasto(descripcion, valor, fecha, etiquetas);

    gp.anyadirGasto(gasto1);

    repintar();
}

function EditarHandle(gasto){
    this.gasto = gasto;

    this.handleEvent = function(){
       /** Prompt **/
    }
}

export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
}