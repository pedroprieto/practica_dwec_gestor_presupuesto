'use strict'
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0) {
        presupuesto = cantidad;
        return presupuesto;
    } else {
        let error = -1;
        console.log("Presupuesto inferior a 0");
        return error;
    }
}

function mostrarPresupuesto() {
    let texto = "Tu presupuesto actual es de " + presupuesto + " €";
    return texto;
}

function CrearGasto(desc, gasto, fecha, ...etiquetas) {
    if (gasto >= 0) {
        this.valor = gasto;
    } else {
        this.valor = 0;
    }

    this.descripcion = desc;

    etiquetas = anyadirEtiquetas(...etiquetas);

    if (etiquetas == null) {
        this.etiquetas = [];
    } else {
        this.etiquetas = anyadirEtiquetas(...etiquetas);
    }

    fecha = Date.parse(fecha);

    if (fecha == null || isNaN(fecha)) {
        this.fecha = +new Date();
    } else {
        this.fecha = fecha;
    }

    this.actualizarValor = function (valorActualizado) {
        if (valorActualizado >= 0) {
            this.valor = valorActualizado;
        }
    }

    this.mostrarGastoCompleto = function () {
        
        var fechaLocal = new Date(fecha).toLocaleString();


        let texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €." + "\n" + 
                    "Fecha: " + fechaLocal + "\n" +
                    "Etiquetas:\n";
        for (var i = 0; i < this.etiquetas.length; i++) {
            texto += "- " + etiquetas[i] + "\n";
        }
        return texto;
    }
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }


}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    //TODO: TERMINAR
    var id = idGasto;
    idGasto++;

    var lista = [id, gasto];

    gastos.push(lista);

}

function borrarGasto() {

}

function calcularTotalGastos() {

}

function calcularBalance() {
    
}

function anyadirEtiquetas(...Args) {
    var lista = [];

    for (const arg of Args) {
        if (lista.includes(arg) == false) {
            lista.push(arg);
        }
    }
    return lista;
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
