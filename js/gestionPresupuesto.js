// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(param) {
    // TODO
    if (param >= 0) {
        presupuesto = param;
        return presupuesto;
    } else {
        console.log ("Presupuesto no válido.");
        return (-1);
    }
}

function mostrarPresupuesto() {
    // TODO
    let mensaje = "Tu presupuesto actual es de " + presupuesto + " €";

    return (mensaje);
}

function listarGastos() {
    return (gastos);
}

function anyadirGasto() {

}

function borrarGasto() {

}

function calcularTotalGastos() {

}

function calcularBalance() {

}

function CrearGasto(descr, val) {
    // TODO
    this.descripcion = descr;
    if(val >= 0) {
        this.valor = val;
    }else {
        this.valor = 0;
    }
    this.fecha = new Date();
    this.etiquetas = [];


    this.mostrarGasto = function() {
        return('Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €');
    }

    this.actualizarDescripcion = function(ndescr) {
        this.descripcion = ndescr;
    }

    this.actualizarValor = function(nvalor) {
        
        if (nvalor >= 0){
            this.valor = nvalor;
        }
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
}
