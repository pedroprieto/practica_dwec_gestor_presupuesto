"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado.


//Variable global presupuesto
let presupuesto = 0;
let gasto = {}; 

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

function CrearGasto(descripcion, valor) {
    //Objeto gasto
    gasto = {
        descripcion: descripcion,
        valor: valor,
        mostrarGasto: function(){
            console.log ("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor +" €");
        },
        actualizarDescripcion: function(nuevaDescripcion){
            gasto.descripcion = nuevaDescripcion;
        },
        actualizarValor: function(nuevoValor){
            if(nuevoValor>=0){
                gasto.valor = nuevoValor;
            }
        },        
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
