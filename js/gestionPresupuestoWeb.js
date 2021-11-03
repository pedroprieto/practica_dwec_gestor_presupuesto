"use strict";

import * as gp from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    let mostrar = document.getElementById(idElemento);
    mostrar.innerHTML = `${valor}`;
}

function mostrarGastoWeb(idElemento, gasto){

    let mostrar = document.getElementById(idElemento);

    let evEditar = new EditarHandle();
    evEditar.gasto = gasto;

    let div = document.createElement("div");
    div.className = "gasto";

    let divDesc = document.createElement("div");
    divDesc.className = "gasto-descripcion";
    divDesc.textContent = `${gasto.descripcion}`;

    let divFech = document.createElement("div");
    divFech.className = "gasto-fecha";
    divFech.textContent = `${gasto.fecha}`;

    let divVal = document.createElement("div");
    divVal.className = "gasto-valor";
    divVal.textContent = `${gasto.valor}`;

    let divEtiq = document.createElement("div");
    divEtiq.className = "gasto-etiquetas";

    for(let etiqueta of gasto.etiquetas){
        let spanEtiq = document.createElement("span");
        spanEtiq.className = "gasto-etiquetas-etiqueta";
        spanEtiq.textContent = `${etiqueta}`;
        divEtiq.append(spanEtiq);
    }

    let boton = document.createElement("button");
    boton.className = "gasto-editar";
    /*boton.id = "gasto-editar";*/
    boton.type = "button";
    boton.textContent = "Editar";
    boton.addEventListener("click", evEditar);

    div.append(divDesc);
    div.append(divFech);
    div.append(divVal);
    div.append(divEtiq);
    div.append(boton);
    mostrar.append(div);

    /*let evEditar = new EditarHandle();
    evEditar.gasto = gasto;*/
    //document.getElementsByClassName("gasto-editar").addEventListener("click", evEditar);
    //document.getElementById("gasto-editar").addEventListener("click", evEditar);
    
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

function EditarHandle(){

    this.handleEvent = function(e){
       //Pedir datos al usuario
       let desc = prompt("Introduce la descripción nueva", this.gasto.descripcion);
       let val = prompt("Introduce el valor nuevo", this.gasto.valor);
       let fech = prompt("Introduce la fecha nueva", this.gasto.fecha);
       let etiq = prompt("Inroduce las etiquetas nuevas", this.gasto.etiquetas);

       val = parseFloat(val);
       etiq = etiq.split(',');

       this.gasto.etiquetas = [];

       this.gasto.actualizarDescripcion(desc);
       this.gasto.actualizarValor(val);
       this.gasto.actualizarFecha(fech);
       //this.gasto.anyadirEtiquetas(etiq);
       //this.gasto.anyadirEtiquetas(etiq);
       //this.gasto.etiquetas = etiq;
       this.gasto.anyadirEtiquetas(etiq);

       console.log(this.gasto.etiquetas);

       repintar();
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