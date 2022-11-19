// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
"use strict"

var presupuesto = 0;


function actualizarPresupuesto(num) {
    if(num >= 0){
        return presupuesto = presupuesto + num; 
    }else{
        console.log("Valor no válido");
        return -1; 
    }
} // actualizarPresupuesto

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
} // mostrarPresupuesto

function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    this.valor = valor > 0 ? valor : 0;
   
} // obj

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
