// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if (nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        console.log("Error: el valor introducido no es correcto.");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };
}

function listarGastos() {
    return gastos;
}

function anyadirGasto() {

}

function borrarGasto() {

}

function calcularTotalGastos() {

}

function calcularBalance() {

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
