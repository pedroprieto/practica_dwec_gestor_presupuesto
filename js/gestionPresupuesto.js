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

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    // Métodos
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
        let mensaje = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n"
                    + "Fecha: " + new Date(this.fecha).toLocaleString() + "\n"
                    + "Etiquetas:\n";
        
        for (let etiqueta of this.etiquetas) {
            mensaje += "- " + etiqueta + "\n";
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

    // Propiedades
    this.descripcion = descripcion;
    this.valor = valor >= 0 ? valor : 0;
    this.fecha = Date.parse(fecha) ? Date.parse(fecha) : new Date().getTime();
    this.etiquetas = [];
    this.anyadirEtiquetas(...etiquetas);    // Como se llama a un método del propio constructor dicho método debe encontrarse ANTES de la llamada

}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(idGasto) {
    for (let gasto of gastos) {
        if (gasto.id == idGasto) {
            gastos.splice(gastos.indexOf(gasto), 1);
        }
    }
}

function calcularTotalGastos() {
    let totalGastos = 0;

    for (let gasto of gastos) {
        totalGastos += gasto.valor;
    }

    return totalGastos;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
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
