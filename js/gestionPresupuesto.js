// Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoValor) {

    if (nuevoValor >= 0) {
        presupuesto = nuevoValor;

        return presupuesto;
    } else {
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €` ;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    
    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(descripcion) {
        this.descripcion = descripcion;
    };

    this.actualizarValor = function(valor) {
        if (valor >= 0) {
            this.valor = valor;
        }
    };

    this.etiquetas = [];

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let etiq of nuevasEtiquetas) {

            if(! this.etiquetas.includes(etiq)) {
                this.etiquetas.push(etiq);
            }
        }
    };

    this.borrarEtiquetas = function(...nombreEtiquetas) {

        for (let etiq of nombreEtiquetas) {
            let posEtiqueta = this.etiquetas.indexOf(etiq);

            if (posEtiqueta >= 0) {
                this.etiquetas.splice(posEtiqueta, 1);
            }
        }
    };

    this.actualizarFecha = function(nuevaFecha) {
        if (! isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    };

    let nFecha = Date.parse(fecha);

    if (isNaN(nFecha)) {
        this.fecha = Date.now();
    } else {
        this.fecha = nFecha;
    }

    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(nuevoGasto) {

    nuevoGasto["id"] = idGasto;
    idGasto++;
    gastos.push(nuevoGasto);
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
