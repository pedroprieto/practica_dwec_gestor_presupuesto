let presupuesto = 0;
let gastos =[];
let idGasto = 0;

function actualizarPresupuesto(valor){
    if (valor < 0 || isNaN(valor)){
        return -1;
       
    } else{
        return presupuesto = valor;
    }
}

function mostrarPresupuesto() {
   return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, etiquetas) {
    this.descripcion = descripcion;
    if (valor < 0 || isNaN(valor)){
        this.valor = 0;
    } else{
        this.valor = valor;
    }

    if (fecha == null || isNaN(fecha)){
        fecha = Date.parse(new Date());
        this.fecha = fecha; 
    } else{
        fecha = Date.parse(fecha);
        this.fecha = fecha; 
    }

    this.etiquetas = [];
        if(etiquetas == null){
            this.etiquetas = [];
        }
        else{
           for (let i in etiquetas){
            this.etiquetas.push(etiquetas[i]);
           }
        }  

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
        return this.descripcion;
    }
    this.actualizarValor = function(valor){
        if (valor >= 0 & isNaN(valor) == false){
            this.valor = valor;
        }
        return this.valor;
    }
}


function listarGastos(){
    return gastos;
}
function anyadirGasto(gastoAnyadir){
    gastoAnyadir.id = idGasto;
    idGasto++;
    gastos.push(gastoAnyadir);
}
var gasto = new CrearGasto("Alquiler", 300, "2021-10-06T13:10", "casa", "libro", "casa");
anyadirGasto(gasto);
console.log(gasto.mostrarGasto());
console.log(listarGastos());
//var gasto1 = new CrearGasto("Cine", 15, "2022-10-06T13:10", "SpiderMan");
//anyadirGasto(gasto1);
//console.log(gasto1.mostrarGasto());
//console.log(listarGastos());

function borrarGasto(id){


}
function calcularTotalGastos(){

}
function calcularBalance(){

}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    CrearGasto
    
}
