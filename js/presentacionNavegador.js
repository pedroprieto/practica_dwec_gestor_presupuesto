alert("María del Carmen García Mora");

// Valor inicial
let presupuesto = -6;

function actualizarPresupuesto( presupuesto ) {
    // TODO Actualiza la variable global presupuesto

    if ( presupuesto >= 0 ){
        return presupuesto;
    }
    else {
        alert("ERROR: El valor introducido es un número negativo");
        return -1;
    }
}

alert( actualizarPresupuesto(presupuesto) );