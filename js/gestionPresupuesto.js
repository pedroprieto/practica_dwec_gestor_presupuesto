// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(actualizarPres) {
    // TODO
    if (actualizarPres >= 0) {
        presupuesto = actualizarPres;
        return actualizarPres;
    } else {
        let mensErr = "Error el valor del Presupuesto es ";
        return mensErr, -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function (actualizarDescrip) {
        this.descripcion = actualizarDescrip;
    }
    this.actualizarValor = function (actualizarVal) {
        this.valor = (actualizarVal >= 0) ? actualizarVal : this.valor;
    }
    this.mostrarGastoCompleto = function () {
        let textocompleto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`
        for (let x of this.etiquetas) {
            textocompleto += `- ${x}\n`
        }
        return textocompleto;
    };

    this.actualizarFecha = function (fecha) {
        let actFe = Date.parse(fecha);
        if (actFe) {
            this.fecha = actFe;
        }
    }

    this.anyadirEtiquetas = function (...etqs) {
        for (let actEti of etqs) {
            if (this.etiquetas.indexOf(actEti) == -1) {
                this.etiquetas.push(actEti);
            }
        }
    }

    this.borrarEtiquetas = function (...etqs) {
        let arrEti = [];
        for (let e of this.etiquetas) {
            if (etqs.indexOf(e) == -1) {
                arrEti.push(e);
            }
        }

        this.etiquetas = arrEti;

    }

    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    this.etiquetas = [];
    this.anyadirEtiquetas(...etiquetas);
    let feactual = Date.parse(fecha);
    if (feactual) {
        this.fecha = feactual;
    } else {
        this.fecha = Date.parse(new Date());
    }
}

function listarGastos() {
    return gastos;
}
function anyadirGasto(gasto) {
    gasto.id = idGasto++;
    gastos.push(gasto);
}
function borrarGasto(idGasto) {
    let gasto = null;
    for (let borrgasto of gastos) {
        if (borrgasto.id == idGasto) {
            gasto = borrgasto;
        }
    }
    if (gasto) {
        let posGasto = gastos.indexOf(gasto);
        gastos.splice(posGasto, 1);
    }
}
function calcularTotalGastos() {
    let total = 0
    for (let gastosTo of gastos) {
        total += gastosTo.valor;
    }
    return total;
}
function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
