"use strict";

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

//* FUNCIONES: 

function actualizarPresupuesto(ingreso) {                       //OK 
    if (ingreso >= 0) {
        return presupuesto = ingreso;
    }
    else {
        console.log("Error");
        return -1;
    }
}

function mostrarPresupuesto() {                                 //OK
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
function listarGastos() {
    return gastos;
}

function anyadirGasto() {

}

function borrarGasto() {

}

function calcularTotalGastos() {

}

function calcularBalance() {

}

//* OBJETO

function CrearGasto(descrip, valorIntroducido) {

    this.descripcion = descrip;

    // prodiedad valor= opción condicional ? del libro: "this.valor = (valor >=0) ? valor : 0;"
    if (valorIntroducido > 0) { 
        this.valor = valorIntroducido;
    }                                  
    else {
        this.valor = 0;
    }

    //* Métodos del objeto:

    this.mostrarGasto = function () {                           //OK
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
    this.actualizarDescripcion = function (nuevoTexto) {        //OK 
        this.descripcion = nuevoTexto;
    };
    this.actualizarValor = function (nuevoValor) {              //OK Opción libro, con condicional ?sería: "this.valor = (valor >=0) ? valor : this.valor;"
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
