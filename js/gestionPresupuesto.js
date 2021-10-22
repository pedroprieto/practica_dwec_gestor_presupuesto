// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valorActual) {
    // TODO
    
    if (valorActual >= 0){
        presupuesto =  valorActual;
        console.log(`Valor de la variable presupuesto es de ${presupuesto} €`);
        return presupuesto;
    } else{
        console.log("Valor no valido");
        return -1;
    }

}

function listarGastos(){
    return gastos;
}

function anyadirGasto(){

}

function borrarGasto(){

}

function calcularTotalGastos(){

}

function calcularBalance(){

}



function mostrarPresupuesto() {
    // TODO
    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    if(valor>=0)
    {
    this.valor = valor;
    }else{
        this.valor = 0;
    }

    if(!fecha)
    {
        fecha = new Date();
        this.fecha = fecha;
    }else{
        fecha = Date.parse(fecha)
        this.fecha = fecha;
    }

    if(!etiquetas)
    {
        this.etiquetas = [];
    }else{
        this.etiquetas = etiquetas;
    }
    


    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
    }
    this.actualizarDescripcion = function(descripcionNueva){
        this.descripcion = descripcionNueva;
    }
    this.actualizarValor = function(valorNuevo){
        if (valorNuevo >= 0){
            this.valor = valorNuevo;
        }
    }
   
    
     
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
