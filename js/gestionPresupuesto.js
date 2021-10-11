// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

//Variable global
let presupuesto = 0;

function actualizarPresupuesto(x) {

    if (x >= 0)
    { 
        presupuesto = x;
        return x;
    }
    else
    {
        x = -1
        return x;
    }
}

function mostrarPresupuesto() {
    // TODO
    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
}

function CrearGasto(descripcion, valor) {
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
