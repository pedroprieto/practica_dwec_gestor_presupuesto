// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(cantidad) {

    let x = presupuesto;

    if (cantidad > -1){
        presupuesto = presupuesto + cantidad;
        return `Tu presupuesto actual es de ${presupuesto} €`
    } else{
        return -1;
    }
}

function mostrarPresupuesto() {
    
    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`
}

function CrearGasto(concepto, cantidad) {
    
   
        this.descripcion = concepto,
        this.valor = cantidad
   

    gasto.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
