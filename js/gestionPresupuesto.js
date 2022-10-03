// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";
// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(actual) {
    // TODO
    if (actual >= 0) {
        presupuesto = actual;
        return presupuesto;
    }
    else {
        return "El valor no es correcto -1";
    }
}

function mostrarPresupuesto() {
    // TODO
    let mensaje;
    mensaje = `Tú presupuesto actual es de ${presupuesto} €`
    return mensaje;
}

function CrearGasto(descripcion, valor) {
    // TODO
    // Propiedades del objeto
    this.descrpcion = descripcion;
    this.valor = valor;
    if ( valor >= 0) {
        valor = valor;
    }
    else {
        valor = 0;
    }
    this.mostrarGasto = function() {
        let mensaje;
        mensaje = `Gasto correspondiente a ${this.descrpcion} con valor ${this.valor} €`;
        return mensaje;
    }
    this.actualizarDescripcion = function(actualizaDescripcion) {
        this.descrpcion = actualizaDescripcion;
    }
    this.actualizarValor = function(nuevoValor) {
        if( nuevoValor >= 0 && nuevoValor == Number) {
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
