// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;
const gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if (nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        console.log("Presupuesto no válido");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = valor >= 0 ? valor : 0;
    this.fecha = Date.parse(fecha) || Date.now();
    this.etiquetas = etiquetas;

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
        let ret = `${this.mostrarGasto()}.\n`;
        ret += `Fecha: ${(new Date(this.fecha)).toLocaleString()}\n`;
        ret += "Etiquetas:\n";
        for (const etiqueta of this.etiquetas) {
            ret += `- ${etiqueta}\n`;
        }
        return ret;
    }
    this.actualizarFecha = function(fecha) {
        if (Date.parse(fecha)) {
            this.fecha = Date.parse(fecha);
        }
    }
    this.anyadirEtiquetas = function(...etiquetas) {
        for (const etiqueta of etiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    gastos.push(gasto);
    idGasto++;
}

function borrarGasto(id) {
    const idxBorrar = gastos.findIndex(gasto => gasto.id === id);
    gastos.splice(idxBorrar, 1);
}

function calcularTotalGastos() {
    return gastos.reduce((suma, gasto) => suma + gasto.valor, 0);
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
    calcularBalance,
}
