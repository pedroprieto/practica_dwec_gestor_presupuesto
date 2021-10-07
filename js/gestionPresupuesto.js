"use strict";

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;

function actualizarPresupuesto(cantidad) {
    if(cantidad >= 0){
        presupuesto = cantidad;
    }else if(cantidad < 0){
        presupuesto = -1;
    }

    return presupuesto;
}

function mostrarPresupuesto() {
    let mensaje = `Tu presupuesto actual es de ${presupuesto} €`
    return mensaje;
}

function CrearGasto() {
    // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
