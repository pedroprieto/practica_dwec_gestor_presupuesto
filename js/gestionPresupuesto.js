"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado.


//Variable global presupuesto
let presupuesto = 0;
let gasto = new CrearGasto; 

function actualizarPresupuesto(nuevoPresupuesto) {
    if(nuevoPresupuesto >= 0){
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    }
    else{
        console.log('Error. Numero menor que 0');
        return -1;
    }
}

function mostrarPresupuesto() {
    return 'Tu presupuesto actual es de ' + presupuesto + " €";
}

//Función constructora
function CrearGasto(descripcionGasto, valorGasto){

    this.descripcion = descripcionGasto;
    this.valorUsar = isNaN(valorGasto)?0:valorGasto;
    this.valor = this.valorUsar>=0?this.valorUsar:0;
    
    
    this.mostrarGasto = function (){
        return ("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor +" €");
    }

    this.actualizarDescripcion = function (descripcionGasto){
        this.descripcion = descripcionGasto;
    }
    
    this.actualizarValor = function (valorGasto){
        if(valorGasto >= 0){
            this.valor = valorGasto;
        }    
    } 
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
