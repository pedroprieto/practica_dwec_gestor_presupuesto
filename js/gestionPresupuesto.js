"use strict"
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
// TODO: Variable global
 

function actualizarPresupuesto(dinero) {
    if (dinero >= 0){
        presupuesto += dinero;
        alert(presupuesto);
    }
    else {
        alert(-1);
    }
}

function mostrarPresupuesto() {
    alert(`Tu presupuesto actual es ${presupuesto}€`);
}

function CrearGasto() {
    let gasto = {
        descricion: "",
        valor: 0,
        mostrarGasto(){
            `Gasto correspondiente a ${this.descricion} con valor ${this.valor}`
        },
        actualizarDescripccion(descripcion){
            this.descricion = descripcion;        
        },
        actualizarValor(valor){
            if(valor >= 0){
                this.valor = valor;
            }
        }
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
/*export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
*/

CrearGasto();
actualizarDescripccion();
actualizarValor(6);
mostrarGasto();