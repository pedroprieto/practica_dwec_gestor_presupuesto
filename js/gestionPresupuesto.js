// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 2;
// TODO: Variable global


function actualizarPresupuesto(p) {
    if(p >= 0){
         p = presupuesto;
    }else {
        return p = -1;
    }

    return p;
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}

console.log(mostrarPresupuesto());

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
