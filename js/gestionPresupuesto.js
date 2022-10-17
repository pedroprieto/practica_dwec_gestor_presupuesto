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

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto ++;
    gastos.push(gasto);
}

function borrarGasto() {

}

function calcularTotalGastos() {

}

function calcularBalance() {

}

function CrearGasto(descr, val, fech, ...etiq) {
    // TODO
    this.descripcion = descr;
    this.valor = 0;

    this.fecha = Date.now();
    if(Date.parse(fech) !== null) {
        this.fecha = fech;
    }

    this.etiquetas = [];

    //métodos
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

    this.mostrarGastoCompleto = function() {
    let gastoDesc = "Gasto correspodiente a " + this.descripcion + " con valor " + this.valor + " €.\n";
    let fechFormat = "Fecha: " + this.fecha;
    }

    this.actualizarFecha = function() {
    
    }

    this.anyadirEtiquetas = function(...arg) {
        for(let i=0; i<arg.length; i++){
            if(!(this.etiquetas.includes(arg[i],0))){
                this.etiquetas.push(arg[i]);
            }
        }
    }

    this.borrarEtiquetas = function() {
    
    }


    if(etiq){
        this.anyadirEtiquetas(...etiq);
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
