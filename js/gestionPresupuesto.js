// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {
    let retorno = -1;

    if (cantidad >= 0) {
        presupuesto = cantidad;
        retorno = presupuesto;
    } else {
        console.log('Error: valor negativo');
    }

    return retorno;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    this.descripcion = descripcion;
    this.valor = valor >= 0 ? valor : 0;
    this.fecha = new Date();
    this.etiquetas = [];
    
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(descripcion) {
        this.descripcion = descripcion;
    }

    this.actualizarValor = function(valor) {
        if (valor >= 0) {
            this.valor = valor;
        }
    }

    this.mostrarGastoCompleto = function() {
        let mensaje = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €."
                    + "\nFecha: " + this.fecha.toLocaleString
                    + "\nEtiquetas:";
        
        for (let etiqueta of this.etiquetas) {
            mensaje += "\n - " + etiqueta;
        }

        return mensaje;
    }

    this.actualizarFecha = function(fecha) {
        if (Date.parse(fecha)) {
            this.fecha = Date.parse(fecha);
        }
    }

    this.anyadirEtiquetas = function(...etiquetas) {
        for (let etiqueta of etiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.borrarEtiquetas = function(...etiquetas) {
        for (let etiqueta of etiquetas) {
            if (this.etiquetas.includes(etiqueta)) {
                this.etiquetas.splice(this.etiquetas.indexOf(etiqueta), 1);
            }
        }
    }
}

function listarGastos() {
    return gastos;
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
