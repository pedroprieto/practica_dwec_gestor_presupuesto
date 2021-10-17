// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos= [];
let idGasto = 0;

function actualizarPresupuesto(numero) {
    if(numero > 0){
        presupuesto = numero;
        return numero;
    }
    else{
        return -1;

    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}


function CrearGasto(descripcion,valor) {

    this.descripcion = descripcion;
    

    this.actualizarDescripcion  = function(descripcion){
        this.descripcion = descripcion;
    }
    
    
    this.mostrarGasto = function () {
        return  `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        
    }

    this.actualizarValor = function (valor){
        if (valor > 0 ){
        this.valor = valor;
        }
    }
    if (valor > 0 ){
        this.valor = valor; 
    } 
    else {
        this.valor = 0;
    }
    
}
    
    
function listarGastos(){
    return gastos
}
function calcularTotalGastos (){}
function calcularBalance(){}
function anyadirGasto(){}
function borrarGasto(){}

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
