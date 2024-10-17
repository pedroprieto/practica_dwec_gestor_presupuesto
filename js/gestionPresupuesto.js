// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto=0;

function actualizarPresupuesto(presu) {
    if (isNaN(presu)){
        return -1
    }
    if (presu < 0){
        return -1
    }

    presupuesto=presu
    return presupuesto
}

function mostrarPresupuesto() {
    // TODO
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
