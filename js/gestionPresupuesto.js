// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// TODO: Variable global


function actualizarPresupuesto(cantidad) {
    if (CompruebaCantidad(cantidad) <= 0) {
        console.log('No se pueden introducir números negativos');
        return -1;
    } else {
        presupuesto = cantidad;
        console.log(cantidad)
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CompruebaCantidad(cantidad) {
    if (cantidad < 0 || isNaN(cantidad)) {
        return -1;
    }
    else {
        return cantidad;
    }
}
function CrearGasto(descripcion, valorGasto, fecha, ...etiquetas) {

    this.descripcion = descripcion;

    if (CompruebaCantidad(valorGasto) > -1) {
        this.valor = valorGasto;
    } else {
        this.valor = 0;
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function (nuevoValor) {
        if (CompruebaCantidad(nuevoValor) > -1) {
            this.valor = nuevoValor;
        }
    }

    this.actualizarFecha = function (fecha) {
        var fechaParseada = Date.parse(fecha);
        if (isNaN(fechaParseada)) {
            var fechaActual = new Date();
            this.fecha = Date.parse(fechaActual);
        } else {
            this.fecha = fechaParseada;
        }
    }

   
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    anyadirGasto,
    listarGastos,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
