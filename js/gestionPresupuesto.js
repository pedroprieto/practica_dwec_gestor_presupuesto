let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {
    if (typeof cantidad === 'number' && cantidad >= 0) {
        presupuesto = cantidad;
        return presupuesto;
    } else {
        console.log("La cantidad introducida no puede ser negativa.")
        return -1;    
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, cantidad, fecha = Date.now(), ...etiquetas) {

    let valor = 0;

    if (typeof cantidad === 'number' && cantidad >= 0) {
        valor = cantidad;
    }

    this.valor = valor;
    this.descripcion = descripcion;
    this.fecha = Date.parse(fecha);
    this.etiquetas = etiquetas;

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGastoCompleto = function() {
        let gastoCadena = '';
        gastoCadena += `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        gastoCadena += `Fecha: ${new Date(this.fecha).toLocaleString('es-ES')}\n`;
        gastoCadena += 'Etiquetas:\n';

        for(let etiqueta of this.etiquetas) {
            gastoCadena += `- ${etiqueta}\n`;
        }

        return gastoCadena;
    }

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto() {}
function borrarGasto() {}
function calcularTotalGastos() {}
function calcularBalance() {}

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
