// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {

    if (valor >= 0) {
        presupuesto = valor;
        return valor;
    } else {
        return -1;
    }

}

function mostrarPresupuesto() {
    let x = presupuesto;
    
    return `Tu presupuesto actual es de ${x} €`;
    
    
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
    this.descripcion = descripcion;

    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }


    this.fecha = new Date();
    
    if (!isNaN(Date.parse(fecha))) {


        this.fecha = Date.parse(fecha); 
        
    }

    this.etiquetas = [];

    if(etiquetas = []) {

        this.etiquetas = [];
    }
   
  
    

    
    
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
    }

    this.actualizarDescripcion = function(descripcionNueva) {
        this.descripcion = descripcionNueva;
        return descripcionNueva;
    }

    this.actualizarValor = function(valorNuevo) {
        if (valorNuevo >= 0) {
            this.valor = valorNuevo;
            return valorNuevo; 
        } else {
            this.valor = this.valor;
        }
    }
}


function listarGastos() {
 return gastos;
}

function anyadirGasto(id) {

    /*
    this.id = this.idGasto; 
    idGasto++;
    gastos.push(id); */
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
