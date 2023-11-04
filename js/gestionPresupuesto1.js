let presupuesto = 0;

// Función para actualizar el presupuesto
function actualizarPresupuesto(valor) {
    if (typeof valor === 'number' && valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.error('Error: El valor introducido no es un número no negativo.');
        return -1;
    }
}

// Función para mostrar el presupuesto actual
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

// Función constructora para crear objetos gasto
function CrearGasto(descripcion, valor) {
    if (typeof valor === 'number' && valor >= 0) {
        this.descripcion = descripcion;
        this.valor = valor;
    } else {
        this.descripcion = descripcion;
        this.valor = 0;
    }

    // Método para mostrar el gasto
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
}

// Exporta las funciones y el objeto gasto
export { actualizarPresupuesto, mostrarPresupuesto, CrearGasto };