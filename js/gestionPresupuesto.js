// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto( valor ) {
    // TODO Actualiza la variable global presupuesto

    if ( !isNaN( valor ) && valor >= 0 ){    
        return presupuesto = valor;
    }
    else {
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO Devuelve el valor de la variable global presupuesto
    return(`Tu presupuesto actual es de ${presupuesto} €`);    
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