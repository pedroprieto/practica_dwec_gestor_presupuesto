// Crear las funciones, objetos y variables indicadas en el enunciado

// Variable global
var presupuesto = 0;

function actualizarPresupuesto(num) {
    if(num >= 0){
        presupuesto = num;
        return presupuesto;
    }
    else{
        console.log("No se puede introducir un número negativo.");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto}€`;
}

function CrearGasto(descripcion, valor) {
    
    this.descripcion = descripcion;
    this.valor = valor,

    this.mostrarGasto = function(){
        console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor}€`);
    };
    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        return descripcion;
    };
    this.actualizarValor = function(valor){
        if(valor < 0){
            valor = this.valor;
            return valor;
        }
        else{
            this.valor = valor;
            return valor;
        }
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
