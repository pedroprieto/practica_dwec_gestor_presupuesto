let presupuesto = 0;

function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0) {
        presupuesto = cantidad;
        return presupuesto;
    }

    console.log("La cantidad introducida no puede ser negativa.")
    return -1;    
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto() {
    // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
