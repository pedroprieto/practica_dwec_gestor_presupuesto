// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(cantidad) {

    // let x = presupuesto;

    if (cantidad >= 0){
        presupuesto = cantidad;
        return `Tu presupuesto actual es de ${presupuesto} €`
    } else{
        return -1;
    }
}

function mostrarPresupuesto() {
    
    // let x = presupuesto;
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(concepto, cantidad) {
    
    this.descripcion = concepto;
    this.valor = cantidad;
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
    this.actualizarDescripcion = function (nueva_decripcion){
        this.descripcion = nueva_decripcion;
    };
    this.actualizaValor = function (nuevo_valor){
        if (nuevo_valor >= 0){
            this.valor = nuevo_valor;
        }
        
    };

};

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
