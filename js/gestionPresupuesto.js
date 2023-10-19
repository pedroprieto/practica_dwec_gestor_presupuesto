// TODO: Variable global
let presupuesto = 0;
let gastos = [''];
let idGasto =  0;

function actualizarPresupuesto(actualizarPres) {
    // TODO
    if (actualizarPres >= 0) {
        presupuesto = actualizarPres;
        return actualizarPres;
    } else {
        var mensErr = "Error el valor del Presupuesto es ";
        return mensErr, -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    // TODO
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function (actualizarDescrip) {
        this.descripcion = actualizarDescrip;
    }
    this.actualizarValor = function (actualizarVal) {
        if (actualizarVal >= 0) {
            this.valor = actualizarVal;
        } else {
            valor = this.valor;
        }

    }
    this.descripcion = descripcion;
    if (valor >= 0) {
        this.valor = valor;
        return this.valor;
    } else {
        this.valor = 0;
        return this.valor;
    }

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
