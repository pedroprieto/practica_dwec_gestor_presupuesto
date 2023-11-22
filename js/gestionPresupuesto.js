// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

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

function CrearGasto(descripcion, valor) {
    //TODO
    
    // Propiedades
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    
    // Métodos
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    
    this.actualizarValor = function(nuevoValor) {
        this.valor = (nuevoValor >= 0) ? nuevoValor : this.valor;
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
}
