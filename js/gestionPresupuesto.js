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

    this.etiquetas = etiquetas;

    if (etiquetas == null) {
        this.etiquetas = [];
    }

    this.mostrarGasto = function () {
        let texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
        return texto;
    }

    this.anyadirEtiquetas = function (...etiquetas) {

        for (const etiqueta of etiquetas) {
            if (this.etiquetas.includes(etiqueta) == false) {
                this.etiquetas.push(etiqueta);
            }
        }
        return this.etiquetas;
    }

    this.borrarEtiquetas = function (...etiquetasABorrar) {
        for (let i = 0; i < etiquetasABorrar.length; i++) {
            for (let j = 0; j < this.etiquetas.length; j++){
                if (etiquetasABorrar[i] == etiquetas[j]) {
                    this.etiquetas.splice(j, 1);
                }
            }
        }
    }

    fecha = Date.parse(fecha);

    if (fecha == null || isNaN(fecha)) {
        this.fecha = +new Date();
    } else {
        this.fecha = fecha;
    }

    this.actualizarFecha = function (nuevaFecha) {
        
        nuevaFecha = Date.parse(nuevaFecha);

        if (isNaN(nuevaFecha)) {
            this.fecha = fecha;
        } else {
            this.fecha = +new Date(nuevaFecha);
        }
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
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++){
        if (gastos[i].id == id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let totalGastos = 0;
    for (let i = 0; i < gastos.length; i++){
        totalGastos += gastos[i].valor;
    }
    return totalGastos;
}

function calcularBalance() {
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}

function filtrarGastos() {
    
}

function agruparGastos() {
    
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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
