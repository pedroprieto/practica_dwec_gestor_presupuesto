// Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

let gasto = {
    descripcion: "",
    valor: 0,
    fecha: 0,
    etiquetas: [],

    mostrarGasto() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },
    actualizarDescripcion(descripcion) {
        this.descripcion = descripcion;
    },

    actualizarValor(valor) {
        if (valor >= 0) {
            this.valor = valor;
        }
    },

    anyadirEtiquetas(nuevasEtiquetas) {
        for (let etiq of nuevasEtiquetas) {

            if(! this.etiquetas.includes(etiq)) {
                this.etiquetas.push(etiq);
            }
        }
    },
}

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

function CrearGasto(descripcion, valor, fecha = new Date(), ...etiquetas) {
    gasto.descripcion = descripcion;
    
    if (valor >= 0) {
        gasto.valor = valor;
    } else {
        gasto.valor = 0;
    }

    if (etiquetas.length > 0) {
        gasto.anyadirEtiquetas(etiquetas);
    }

    return gasto;
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
