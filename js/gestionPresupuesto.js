
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
// export   {
//     mostrarPresupuesto,
//     actualizarPresupuesto,
//     CrearGasto
// }


// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto=0;

function actualizarPresupuesto(valor) {
    // TODO
    let cantidad=-1;
    if ( valor >= 0)
    {
        presupuesto=valor;
        cantidad=valor;
    }
    return cantidad;
}

function mostrarPresupuesto() {
    // TODO
    return `tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    // TODO
    this.descripcion=descripcion;
    this.valor=valor;

    this.mostrarGasto=function(){
        return `Gasto correspondiente a ${descripcion} con valor ${valor}`;
    }
    this.actualizarDescripcion =function (descripcion){
        this.descripcion=descripcion;
    }
    this.actualizarValor =function(valor){
        this.valor=valor < 0 ? 0:valor;
    }

}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
// export   {
//     mostrarPresupuesto,
//     actualizarPresupuesto,
//     CrearGasto
// }
