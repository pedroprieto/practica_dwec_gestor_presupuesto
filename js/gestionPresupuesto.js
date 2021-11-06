let presupuesto = 0;

function actualizarPresupuesto(cantidad) {
    if (typeof cantidad === 'number' && cantidad >= 0) {
        presupuesto = cantidad;
        return presupuesto;
    } else {
        console.log("La cantidad introducida no puede ser negativa.")
        return -1;    
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, cantidad) {

    let valor = 0;

    if (typeof cantidad === 'number' && cantidad >= 0) {
        valor = cantidad;
    }

    let gasto = {
        valor: valor,
        descripcion: descripcion,
        mostrarGasto: function() {
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        },
        actualizarValor: function(nuevoValor) {
            if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
                this.valor = nuevoValor;
            }
        },
        actualizarDescripcion: function(nuevaDescripcion) {
            this.descripcion = nuevaDescripcion;
        },
    };

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
