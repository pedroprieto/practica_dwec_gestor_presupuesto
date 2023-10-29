"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
var presupuesto = 0;

function actualizarPresupuesto(nuevoValorPresupuesto) {

    if (nuevoValorPresupuesto<0){
        alert (`El presupuesto no puede tener valor negativo. Has introducido un presupuesto de ${nuevoValorPresupuesto}`);
        return -1;
    }
    else{
        presupuesto = nuevoValorPresupuesto;
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    // TODOgit statu
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
