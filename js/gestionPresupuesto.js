// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// la creamos con let
let presupuesto = 0;
//Creación de array gastos e idGasto
let gastos = [];
let idGasto = 0;


// TODO: Variable global


function actualizarPresupuesto(valor) {
    // TODO
    if (typeof valor === 'number' && valor >=0) {
        presupuesto = valor;
        return presupuesto;
    }
    else {
        console.log("El valor introducido no es válido.");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}



//función CrearGasto porqeu es un constructor y va en en mayúsculas.
// Para objeto gasto creamos dentro de Crear Gasto los métodos qeu nos piden

function CrearGasto(descripcion, valor) {
    // TODO

    //propiedades
   // gasto.id = idGasto++;
    this.descripcion = descripcion;
    this.valor = typeof valor === 'number' && valor >=0 ? valor: 0; 

    // Métodos 
    this.mostrarGasto = function () {
       return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function (nuevoValor){
        if(typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    
   

    }
}
function listarGastos () {

}

function anyadirGasto(){

}
function borrarGasto(){

}

function calcularTotalGastos(){
    
}
function calcularBalance(){
    
}

function agregarGasto(gasto){
        gastos.push(gasto);
}







// Lo que haríamos es un nuevo objeto llamado gasto, podríamos haberlo creaado en la función también.



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
