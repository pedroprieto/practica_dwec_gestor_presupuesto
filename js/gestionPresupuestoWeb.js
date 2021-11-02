'use strict';

import * as gestionPresupuesto from "./gestionPresupuesto.js";


function mostrarDatoEnId(idElemento, valor){

    let div = document.getElementById(idElemento);
    div.innerHTML = valor;
}


function mostrarGastoWeb(idElemento, gasto){
    
    let cuerpo = document.getElementById(idElemento);
    let divEtiquetas = "";

    for (let eti of gasto.etiquetas) {
         divEtiquetas += `
        <span class="gasto-etiquetas-etiqueta">
            ${eti}
        </span>
     `
    }
    cuerpo.innerHTML += `
    <div class="gasto">
        <div class="gasto-descripcion">${gasto.descripcion}</div>
        <div class="gasto-fecha">${gasto.fecha}</div>
        <div class="gasto-valor">${gasto.valor}</div>
        <div class="gasto-etiquetas">
        ${divEtiquetas}
        </div>
    </div>
    `;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    let cuerpo = document.getElementById(idElemento);
    let divAgrupados = "";


    for (const[key, value] of Object.entries(agrup)) {
        
        divAgrupados += `
            <div class="agrupacion-dato">
                <span class="agrupacion-dato-clave">${key}</span>
                <span class="agrupacion-dato-valor">${value}</span>
            </div>
        `;
    }   

    cuerpo.innerHTML = `
        <div class="agrupacion">
            <h1>Gastos agrupados por ${periodo}</h1>
            ${divAgrupados}
        </div>
    `;
}


function repintar(){
    
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    let gastosTotales = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastosTotales);

    let balanceTotal = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId("balance-total", balanceTotal);

    document.getElementById("listado-gastos-completo").innerHTML = "";
    let listaGastos = gestionPresupuesto.listarGastos();
    /*mostrarGastoWeb("listado-gastos-completo", listaGastos);*/
    for (const gasto of listaGastos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb(){

    let presupuesto = prompt("Introduce tu presupuesto");
    let presupuestoNum = parseInt(presupuesto);

    gestionPresupuesto.actualizarPresupuesto(presupuestoNum);
    repintar();

}

function nuevoGastoWeb(){
    
    let descripcion = prompt("Introduce una descripción");
    let valor = prompt("Introduce un valor");
    valor = parseFloat(valor);
    let fecha = prompt("Introduce una fecha tipo yyyy-mm-dd");
    let etiquetas = prompt("Introduce las etiquetas separadas por coma");
    etiquetas = etiquetas.split(',');

    let gastoNuevo = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, etiquetas);
    gestionPresupuesto.anyadirGasto(gastoNuevo);
    repintar();
}

function EditarHandle(){

    this.handleEvent = function(){
        
    }
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}