// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(budget) {
    if(budget >=  0){
        presupuesto = budget;
        console.log(presupuesto);
    }
    else{
        console.log("Error");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto}€`;
    
}

function CrearGasto(descripcion,valor) {
    // TODO
    let gasto={};
    gasto.descripcion=descripcion;
    if(valor < 0){
        gasto.valor= 0;
    }
    else{
        gasto.valor = valor;
    }
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
