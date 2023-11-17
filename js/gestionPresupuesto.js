// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;
let gastos = [];
let idGasto = 0;


function actualizarPresupuesto(nuevoPresu) {
    if (nuevoPresu >= 0){
        presupuesto = nuevoPresu;
        return nuevoPresu;
    }
    else{
        console.log("ERROR: no deberias tener un presupuesto negativo");
        return -1;
    }
    
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    //Parámetros por orden de aparición

    this.descripcion = descripcion;

    if (valor >= 0){ //Comprobamos si el valor es negativo
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }

    let date = Date.parse(fecha); //Con el date parse nos aseguramos el tipo timestamp

    if(isNaN(date)){       //Esta comprobación es por que en caso de no ser válida la fecha, se devolveria un NaN
        this.fecha = Date.parse(new Date());
    }
    else{
        this.fecha = date;
    }

    this.etiquetas = etiquetas;

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    }

    this.actualizarValor = function(valor){
        if (valor >= 0){
            this.valor = valor;
        }
    }

}


function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id){
    gastos.splice(gastos.findIndex(item => item.id == id), 1)
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
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
