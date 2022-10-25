// Variables Globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// FUNCIONES PRACTICA JAVASCRIPT i
function actualizarPresupuesto(cantidad) {
    if (cantidad >= 0){
        return presupuesto = cantidad;
        } else{
            return -1;
            console.log("Presupuesto inferior a 0");
        }    
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;    
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    //descripcion
    this.descripcion = descripcion;
    //valor
    if (valor < 0 || isNaN(valor)){
        this.valor = 0;
    } else{
        this.valor = valor;
    }

    // fecha
    fecha = Date.parse(fecha);

    if (fecha == null || isNaN(fecha)){
        this.fecha = +new Date(); // se pasa a timestamp con el + delante
    } else{
        this.fecha = fecha; // getTime() sirve para pasar la fecha a formato timestamp
    }

    //etiqueta
    etiquetas = anyadirEtiquetas(...etiquetas);
    if(etiquetas == null){
        this.etiquetas = [];
    }else{
        this.etiquetas = anyadirEtiquetas(...etiquetas);
    }
    

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} € a fecha de ${this.fecha} con las etiquetas:${this.etiquetas}` ;
    }

    this.actualizarDescripcion = function (descripcion){
        this.descripcion = descripcion;
        return this.descripcion;
    }

    this.actualizarValor = function (valor){
        if (valor >= 0 & isNaN(valor) == false){
            this.valor = valor;
        }
        return this.valor;
    }
}


// Crear una lista con etiquetas sin repeticiones 
function anyadirEtiquetas(...theArgs){
    var lista = [];
    for (const arg of theArgs){
        // comprobar si existe en la lista, si no existe, añadirlo
        if (lista.includes(arg) == false){
            lista.push(arg);
        }
    }
    return lista;
}

// FUNCIONES JAVASCRIPT II
function listarGastos(){

    return gastos;
}

function anyadirGasto(gasto){
    var id = idGasto;
    idGasto++;

    var lista = [id, gasto];
    gastos.push(lista);
    
}
// comprobar si funciona
//var gasto = new CrearGasto("Alquiler", 300, "2021-10-06T13:10", "casa", "libro", "casa");
//anyadirGasto(gasto);
//console.log(gasto.mostrarGasto());
//console.log(listarGastos());

//var gasto1 = new CrearGasto("Cine", 15, "2022-10-06T13:10", "SpiderMan");
//anyadirGasto(gasto1);
//console.log(gasto.mostrarGasto());
//console.log(listarGastos());




function borrarGasto(){

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
