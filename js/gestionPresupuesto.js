// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(num) {
    // TODO
    if (num >= 0) {
        presupuesto = num;
        return presupuesto;
    } else {
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    let mensaje = `Tu presupuesto actual es de ${presupuesto} €`;
    return mensaje;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    //TODO
    // Propiedades
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;

    let f = Date.parse(fecha);
    if (f) {
        this.fecha = f;
    } else {
        this.fecha = Date.parse(new Date());
    }

    this.etiquetas = [];
    this.anyadirEtiquetas = function (...listaEtiquetas) {
        for (let e of listaEtiquetas) {
            if (this.etiquetas.indexOf(e) == -1) {
                this.etiquetas.push(e);
            }
        }
    }

    this.anyadirEtiquetas(...etiquetas);

    // Métodos
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function (nuevoValor) {
        this.valor = (nuevoValor >= 0) ? nuevoValor : this.valor;
    }

    this.mostrarGastoCompleto = function () {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`

        for (let e of this.etiquetas) {
            texto += `- ${e}\n`
        }
        return texto;

    };

    this.actualizarFecha = function (fecha) {
        let f = Date.parse(fecha);

        if (f) {
            this.fecha = f;
        }
    }

    this.borrarEtiquetas = function (...listaEtiquetas) {
        let nuevaListaEtiquetas = [];

        for (let e of this.etiquetas) {
            if (listaEtiquetas.indexOf(e) == -1) {
                nuevaListaEtiquetas.push(e);
            }
        }

        this.etiquetas = nuevaListaEtiquetas;
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto++;
    gastos.push(gasto)
}

function borrarGasto(idGasto) {
    let gasto = null;

    for (let g of gastos) {
        if (g.id == idGasto) {
            gasto = g;
            break;
        }
    }
    if (gasto) {
        let posGasto = gastos.indexOf(gasto);
        gastos.splice(posGasto, 1);
    }
}

function calcularTotalGastos() {
    let total = 0;

    for (let g of gastos) {
        total += g.valor;
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