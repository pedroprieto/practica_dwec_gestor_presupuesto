"use strict";
import * as gesPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId (idElemento, valor) {
    let dato = document.getElementById (idElemento);
    dato.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    //Creo los elementos
    //Primero creo los div    
    
    let divGasto = document.createElement("div");
    let divGastoDescripcion = document.createElement("div");
    let divGastoFecha = document.createElement("div");
    let divGastoValor = document.createElement("div");
    let divGastoEtiquetas = document.createElement("div");
    
    //Creo el elemento donde insertar el html
    let elementoInsertar = document.getElementById (idElemento);


    //Asigno clase a los div
    divGasto.classList.add ("gasto");
    divGastoDescripcion.classList.add ("gasto-descripcion");
    divGastoFecha.classList.add ("gasto-fecha");
    divGastoValor.classList.add ("gasto-valor");
    divGastoEtiquetas.classList.add ("gasto-etiquetas");
    
    let mesString = (parseInt (new Date(gasto.fecha).getMonth()) < 10) ? "0" + new Date(gasto.fecha).getMonth() : new Date(gasto.fecha).getMonth();
    let diaString = (parseInt (new Date(gasto.fecha).getDate()) <10) ? "0" + new Date(gasto.fecha).getDate() : new Date(gasto.fecha).getDate();
    let fechaString = new Date(gasto.fecha).getFullYear() + "-" + mesString + "-" + diaString;  

    divGastoDescripcion.textContent = gasto.descripcion;
    divGastoFecha.textContent = fechaString;
    divGastoValor.textContent = gasto.valor;
    
    

    divGasto.append (divGastoDescripcion);
    divGasto.append (divGastoFecha);
    divGasto.append (divGastoValor);
    divGasto.append (divGastoEtiquetas);

    
    
    elementoInsertar.append (divGasto); 
    
    //Creo los span
    for (let item of gasto.etiquetas) {
        let spanGastoEtiqueta = document.createElement ("span");
        spanGastoEtiqueta.classList.add ("gasto-etiquetas-etiqueta");
        spanGastoEtiqueta.textContent = item;
        divGastoEtiquetas.append (spanGastoEtiqueta);
    }

}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    //Creo elementos
    let divAgrupacion = document.createElement ("div");
    let h1Periodo = document.createElement ("h1");    

    //Asigno clases
    divAgrupacion.classList.add ("agrupacion");


    h1Periodo.textContent = "Gastos agrupados por " + periodo;
    divAgrupacion.append (h1Periodo);


    //Creo el elemento donde insertar el html
    let elementoInsertar = document.getElementById (idElemento);
    
    for (let item in agrup) {
        let propiedad = item;
        let valor = agrup[item];

        //Creo elementos
        let divAgrupacionDato = document.createElement ("div");    
        let spanAgrupacionDatoClave = document.createElement ("span");
        let spanAgrupacionDatoValor = document.createElement ("span");
        
        //Asigno clases
        divAgrupacionDato.classList.add ("agrupacion-dato");
        spanAgrupacionDatoClave.classList.add ("agrupacion-dato-clave");
        spanAgrupacionDatoValor.classList.add ("agrupacion-dato-valor");
    
        spanAgrupacionDatoClave.textContent = propiedad;
        spanAgrupacionDatoValor.textContent = valor;
        
        divAgrupacionDato.append (spanAgrupacionDatoClave);
        divAgrupacionDato.append (spanAgrupacionDatoValor);
        divAgrupacion.append (divAgrupacionDato);
    }

    
    elementoInsertar.append (divAgrupacion);
}

function repintar() {
    //Creo variables con elementos a utilizar

    let divPresupuesto = document.getElementById ("presupuesto ");
    let divGastosTotales = document.getElementById ("gastos-totales");
    let divBalanceTotal = document.getElementById ("balance-total");
    let divListadoGastosCompleto = document.getElementById ("listado-gastos-completo");

    gesPresupuesto.mostrarDatoEnId (divPresupuesto, gesPresupuesto.mostrarPresupuesto ());
    gesPresupuesto.mostrarDatoEnId (divGastosTotales, gesPresupuesto.calcularTotalGastos());
    gesPresupuesto.mostrarDatoEnId (divBalanceTotal, gesPresupuesto.calcularBalance());
    
    //Borro contenido
    divListadoGastosCompleto.innerHTML = "";
    mostrarGastoWeb(divListadoGastosCompleto, gesPresupuesto.listarGastos());
}

function actualizarPresupuestoWeb() {

}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,    
}