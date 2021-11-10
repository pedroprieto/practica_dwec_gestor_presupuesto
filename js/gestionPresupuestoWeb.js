'use strict';

import * as gestionPresupuesto from "./gestionPresupuesto.js";


function mostrarDatoEnId(idElemento, valor){

    let div = document.getElementById(idElemento);
    div.textContent = valor;
}


function mostrarGastoWeb(idElemento, gasto){
    
    let cuerpo = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className = "gasto";
    divGasto.id = "gasto-editar";

    let divDescripcion = document.createElement('div');
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = `${gasto.descripcion}`;

    let divFecha = document.createElement('div');
    divFecha.className = "gasto-fecha";
    divFecha.textContent = `${gasto.fecha}`;

    let divValor = document.createElement('div');
    divValor.className = "gasto-valor";
    divValor.textContent = `${gasto.valor}`;

    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = "gasto-etiquetas";
    
    // boton editar
    let botonEditar = document.createElement('button');
    botonEditar.className = "gasto-editar";
    botonEditar.id = "gasto-editar";
    botonEditar.type = "button";
    botonEditar.textContent = "Editar gasto";
    // evento del botonEditar
    let eventEditar = new EditarHandle();
    eventEditar.gasto = gasto;
    botonEditar.addEventListener("click", eventEditar);

    // boton borrar
    let botonBorrar = document.createElement('button');
    botonBorrar.className = "gasto-borrar";
    botonBorrar.id = "gasto-borrar";
    botonBorrar.type = "button";
    botonBorrar.textContent = "Borrar gasto";
    // evento boton borrar
    let eventBorrar = new BorrarHandle();
    eventBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", eventBorrar);

    /*if(botonEditar.addEventListener("click", eventEditar)){
        divGasto.id = "gasto-editar";
    }else if(botonBorrar.addEventListener("click", eventBorrar)){
        divGasto.id = "gasto-borrar";
    }*/

    for (let eti of gasto.etiquetas) {

        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = `${eti}`;
        divEtiquetas.append(spanEtiqueta);

        let eventBorrarEti = new BorrarEtiquetasHandle();
        eventBorrarEti.gasto = gasto;
        eventBorrarEti.etiqueta = eti;
        spanEtiqueta.addEventListener('click', eventBorrarEti);
    }



        divGasto.append(divDescripcion);
        divGasto.append(divFecha);
        divGasto.append(divValor);
        divGasto.append(divEtiquetas);
        divGasto.append(botonEditar);
        divGasto.append(botonBorrar);

        cuerpo.append(divGasto);
     

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    let cuerpo = document.getElementById(idElemento);
    
    let divAgrupacion = document.createElement('div');
    divAgrupacion.className = "agrupacion";
    let h1 = document.createElement('h1');
    h1.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(h1);



    for (const[key, value] of Object.entries(agrup)) {
        
        let divAgruDato = document.createElement('div');
        divAgruDato.className = "agrupacion-dato";

        let spanKey = document.createElement('span');
        spanKey.className = "agrupacion-dato-clave";
        spanKey.textContent = `${key}`;

        let spanValue = document.createElement('span');
        spanValue.className = "agrupacion-dato-valor";
        spanValue.textContent = `${value}`;

        divAgruDato.append(spanKey);
        divAgruDato.append(spanValue);
        divAgrupacion.append(divAgruDato);
    }   

    cuerpo.append(divAgrupacion);
 
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

    this.handleEvent = function(e){
      let descripcion = prompt("Introduce una descripcion:", this.gasto.descripcion);
      this.gasto.actualizarDescripcion(descripcion);

      let valor = prompt("Introduce un valor:", this.gasto.valor);
      this.gasto.actualizarValor(parseFloat(valor));

      let fecha = prompt("Introduce una fecha", this.gasto.fecha);
      this.gasto.actualizarFecha(fecha);

      let etiquetas = prompt("Introduce las etiquetas:", this.gasto.etiquetas);
      etiquetas = etiquetas.split(',');
      this.gasto.anyadirEtiquetas(...etiquetas);

      repintar();
    }
}

function BorrarHandle(){

    this.handleEvent = function(e){

        gestionPresupuesto.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle(){

    this.handleEvent = function(e){
        
        //this.etiqueta = this.etiqueta.split(',');
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}