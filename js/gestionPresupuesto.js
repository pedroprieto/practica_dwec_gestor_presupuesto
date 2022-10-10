'use strict'
let presupuesto = 0;

function actualizarPresupuesto(cantidad) {
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
    let texto = "Tu presupuesto actual es de " + presupuesto + " €";
    return texto;
}

function CrearGasto(desc, gasto) {
    if (gasto >= 0) {
        this.valor = gasto
    } else {
        this.valor = 0
    }
    this.descripcion = desc,
    this.actualizarValor = function (valorActualizado) {
        if (valorActualizado >= 0) {
            this.valor = valorActualizado
        }
    },
    this.mostrarGasto = function(){
        let texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
        return texto;
        },
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion 
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
