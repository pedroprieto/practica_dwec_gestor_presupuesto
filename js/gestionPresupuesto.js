// Variables globales
    let presupuesto = 0;
    let gastos = [];
    let idGasto = 0;

// Funciones
function actualizarPresupuesto(valor) {
    if (valor >= 0) {
        presupuesto=valor;
        return presupuesto;
    } else {
        console.log(`Error. ${valor} es negativo`);
        return -1;
    }
}

function mostrarPresupuesto() {
    let x = presupuesto;
    return 'Tu presupuesto actual es de '+x+' €';
}

function CrearGasto(descripcion, valor) {

    this.descripcion=descripcion;

    if (valor >= 0) {
        this.valor=valor;
    } else {
        this.valor=0;
    }

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(descripcion) {
        this.descripcion=descripcion;
    }

    this.actualizarValor = function(valor){
        if (valor>=0) {
            this.valor=valor;
        } else {
            this.valor=this.valor;
        }
    }
}

function listarGastos() {
    return String(gastos);
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
