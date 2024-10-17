// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


function actualizarPresupuesto(nuevoPresupuesto) {
    
    return (nuevoPresupuesto >= 0)?(presupuesto = nuevoPresupuesto, nuevoPresupuesto):(console.log("Error, numero negativo"), -1);
}


function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
    this.descripcion=descripcion;
    (valor>0 && !valor.isNaN)?(this.valor = valor):(this.valor = 0);
    (!isNaN(Date.parse(fecha)))?(this.fecha = Date.parse(fecha)):(this.fecha = Date.now());
    (etiquetas)?(this.etiquetas = etiquetas):(this.etiquetas = []);

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
    }

    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor){
        (nuevoValor>0 && !nuevoValor.isNaN)?(this.valor = nuevoValor):(null);
    }
}

function listarGastos(){
    return gastos;
}


function anyadirGasto(gasto){
       gasto.id=idGasto;
       idGasto++;
       gastos.push(gasto);
}
 

function borrarGasto(){}
function calcularTotalGastos(){}
function calcularBalance(){}


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
