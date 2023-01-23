// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto;
presupuesto = 0;

let gastos;
gastos = [];

let idGasto;
idGasto = 0;
 
function actualizarPresupuesto(cantidad) {
    
    if (cantidad > 0) {
        presupuesto = cantidad;
        return presupuesto;
    } else {
        cantidad = "-1";
        return cantidad;
    }
    
    // TODO(hecho)
}

function mostrarPresupuesto() {
    
    let mensaje = `Tu presupuesto actual es de ${presupuesto} €`;
 return mensaje;
    
    // TODO
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
      
   this.descripcion = descripcion;
   this.valor = valor;
   this.fecha = fecha;
   this.etiquetas = [];

   if(valor >= 0){
    this.valor = valor;
   } else {
    this.valor = 0;
   }

   if(fecha){
    fecha = Date.parse(fecha)
    this.fecha = fecha;
   } else {
    fecha = new Date();
    this.fecha = fecha;
   }

   if(!etiquetas) {
    this.etiquetas = [];

   } else {
    this.etiquetas = etiquetas;
   }
   this.mostrarGasto = function(){
    let gasto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    return gasto;
   }

   this.actualizarDescripcion = function (descripcionAct) {
    this.descripcion = descripcionAct;
   }
   this.actualizarValor = function (valorAct){
    if(valorAct >= 0){
    this.valor = valorAct;
    }
   }

    
    
    // TODO
}

function listarGastos() {
 return gastos;
}

function anyadirGasto() {

}

function borrarGasto() {

}

function calcularTotalGastos() {

}

function calcularBalance() {

}

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
