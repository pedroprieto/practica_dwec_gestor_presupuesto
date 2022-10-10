'use strict'
let presupuesto = 0;
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

function actualizarPresupuesto(cantidad) {
    // TODO
    if (cantidad >= 0) {
        presupuesto = cantidad;
        return presupuesto;
    } else {
        let error = -1;
        console.log("Presupuesto inferior a 0");
        return error;
    }
}

function mostrarPresupuesto() {
    // TODO
    let texto = "Tu presupuesto actual es de " + presupuesto + " €";
    return texto;
}

function CrearGasto() {
    // TODO
    
    let gasto = {
        descripcion: "descripción",
        valor: 0
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
