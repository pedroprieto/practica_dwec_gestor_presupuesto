let presupuesto = 0;

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global


function actualizarPresupuesto(cantidad) {
    if(cantidad >= 0){ 
        return presupuesto = cantidad;
    }
    else{
        return -1;
        console.log ("Error");
    }
}

function mostrarPresupuesto() {
   return `Tu presupuesto actual es  de ${presupuesto} €´ ;
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
