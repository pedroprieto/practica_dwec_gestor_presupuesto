"use strict"

let presupuesto = 0; 
let gastos = [];
idGasto = 0;

function actualizarPresupuesto(par1) {
    if (par1 >= 0) {
        presupuesto = par1;
        return presupuesto;
    } else {
        console.log('Error');
        return -1;
    }       
}

function mostrarPresupuesto() {
    let text = "Tu presupuesto actual es de " + presupuesto + " €";
    return text; 
}

function CrearGasto(descrip, val) {
    this.descripcion = descrip;
    if (val > 0) {
        this.valor = val;
    } else {
        this.valor = 0;      
    }
    this.mostrarGasto = function () {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor +" €";       
    };
    this.actualizarDescripcion = function (description) { 

        this.descripcion = description;
    }
    this.actualizarValor= function(val) {
        if (val > 0) {
            this.valor = val;
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
    listarGastos
    anyadirGasto
    borrarGasto
    calcularTotalGastos
    calcularBalance
}
