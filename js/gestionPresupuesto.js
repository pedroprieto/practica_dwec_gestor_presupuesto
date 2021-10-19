// Variable global
let presupuesto = 0;

let gasto = {
    descripcion: "",
    valor: 0,

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

function CrearGasto(descripcion, valor) {
    gasto.descripcion = descripcion;
    
    if (valor >= 0) {
        gasto.valor = valor;
    } else {
        gasto.valor = 0;
    }

    return gasto;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
