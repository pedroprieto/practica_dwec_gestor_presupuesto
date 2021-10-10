// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;

// TODO: Variable global


function actualizarPresupuesto(cantidad) {
    if(CompruebaCantidad(cantidad) <= 0){
        console.log('No se pueden introducir números negativos');
        return -1;
    } else{
        presupuesto = cantidad;
        console.log(cantidad)
        return presupuesto;
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
