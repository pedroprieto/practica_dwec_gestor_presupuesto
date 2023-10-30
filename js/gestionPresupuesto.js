"use strict";

let presupuesto = 0;

function actualizarPresupuesto(ingreso) {
    if (ingreso >= 0) {
        return presupuesto = ingreso;
    }
    else {
        
        console.log("Error");
        return -1;
    }
}

function mostrarPresupuesto() {
     return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descrip, valorIntroducido) {
    
    this.descripcion = descrip;
    if (valorIntroducido > 0) {     
        this.valor = valorIntroducido;
    }
    else {
        this.valor = 0;
     }
    this.mostrarGasto = function () { 
        console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
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
