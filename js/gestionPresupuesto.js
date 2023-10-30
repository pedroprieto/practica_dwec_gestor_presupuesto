"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(nuevoValorPresupuesto) {
if ((nuevoValorPresupuesto < 0) || (isNaN(nuevoValorPresupuesto))) {
        console.log (`El presupuesto no puede tener valor negativo.`);
        return -1;
    }
    else {
        presupuesto = nuevoValorPresupuesto;
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    
    return `Tu presupuesto actual es de ${presupuesto} €`;
    
}

function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    if (isNaN(valor) || (valor < 0)) {
        this.valor = 0;
    }
    else {
        this.valor = valor;
    }

    this.mostrarGasto = function() {
        console.log (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function (descripcion) {
        this.descripcion = descripcion; 
    }

    this.actualizarValor = function (nuevoValor) {
        if (isNaN(nuevoValor) || (nuevoValor < 0)) {
            this.valor = 0;
        }
        else if (nuevoValor >= 0) {
            this.valor = nuevoValor;
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