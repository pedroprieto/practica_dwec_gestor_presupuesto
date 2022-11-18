"use strict"
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
// TODO: Variable global l
 
// Funcion actualizar presupuesto
function actualizarPresupuesto(dinero) {
    if (dinero >= 0){
        presupuesto = dinero;
        return presupuesto;
    }
    else 
        return -1;
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es ${presupuesto}€`);
} 
 
function CrearGasto(valor, descricion) {
    if (valor >= 0)
        this.valor = valor;
    else
        this.valor = 0;
        
    this.descricion = descricion;

    this.mostrarGasto = function() {
        return (`Gasto correspondiente a ${this.descricion} con valor ${this.valor}`);
    }
    this.actualizarDescripcion = function(descricion) {
        this.descricion = descricion;
    }
    this.actualizarValor = function(valor) {
        if (valor >= 0){
            this.valor = valor;
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
