// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
let gasto = []; //Array vacio
let idGasto = 0;
// TODO: Variable global


function actualizarPresupuesto(p) {
    if (p >= 0) {
        p = presupuesto;
        return p;
    } else {
        return p = -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

console.log(mostrarPresupuesto());

function CrearGasto(descripcion, valor) {

    this.actualizarDescripcion = function (des) {
        this.descripcion = des;
    }

    this.actualizarValor = function (valor) {
        this.valor = (valor >= 0) ? valor : this.valor;
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor}`;
    }

    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
}

function listarGastos() {

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
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}