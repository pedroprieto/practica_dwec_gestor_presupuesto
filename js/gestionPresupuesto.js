// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
var presupuesto = 0;    

// TODO: Variable global


function actualizarPresupuesto(value) {
    // TODO
    let retValue = 0;

    if(value < 0 || isNaN(value)) {
        retValue = -1;

    }else{
        presupuesto = value;
        retValue = value;
    }

    return retValue;
}

function mostrarPresupuesto() {
    // TODO
     return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcionIn, valorIn) {
    // TODO
    //PROPIEDADES
    if (valorIn < 0 || isNaN(valorIn))
        valorIn = 0;

    this.descripcion = descripcionIn,
    this.valor = parseFloat(valorIn),

    //METODOS
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },

    this.actualizarDescripcion = function(newDescripcion) {
        this.descripcion = newDescripcion;
    },
    
    this.actualizarValor = function(newValor) {
        if(newValor > 0 && isNaN(newValor))
            this.valor = newValor;
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
