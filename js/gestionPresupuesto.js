// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

//funciones práctica 1
function actualizarPresupuesto(cantidad) {
    let numError= -1;

    if(cantidad >= 0) {
        presupuesto = cantidad;
        return (presupuesto);
    }
    else{
        console.log("Cantidad incorrecta.");
        return (numError);
    }
}

function mostrarPresupuesto() {
    // TODO
    let mensaje; 

    mensaje ="Tu presupuesto actual es de " + presupuesto + " €" ;
    return(mensaje);
}



//funciones práctica 2

function listarGastos(){
    for(let i = '0'; i < gastos.length;i++){
        console.log(gastos[i]);
    }
    return(gastos);
}


function anyadirGasto(paramGasto){
    paramGasto.id= idGasto;
    idGasto++; 
    gastos.push(paramGasto);
}

function borrarGasto(id){
    gastos.splice(id, 1);
    if(idGasto > 0){
        idGasto = idGasto - 1;
    }
}

function calcularTotalGastos(){
    let totalGastos = 0;
    for(let i=0; i < gastos.length;i++){
        totalGastos += parseInt(gastos[i]);
    }

    return(totalGastos);
}

function calcularBalance(){
    let tG;
    let balance;

    tG = calcularTotalGastos();
    balance = presupuesto - tG;

    return(balance);
}



//funcion constructora
function CrearGasto(descrip,cantid, fec, ...etiq) {
    // TODO
    this.descripcion= descrip;
    this.valor = 0;
    this.etiquetas = [];
    this.fecha = new Date().getTime();


    if(cantid >= 0)
    {
        this.valor = cantid;
    }




    //métodos práctica 1
    this.mostrarGasto = function(){
        return("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €");
    }

    this.actualizarDescripcion = function(descr){
        this.descripcion = descr;
    }

    this.actualizarValor = function(val){
        if(val >= 0)
            this.valor = val;
    }

    //métodos práctica 2
    this.mostrarGastoCompleto = function(){      
        this.mostrarGasto();
        console.log("Fecha: " + this.fecha);
        console.log("Etiquetas:");
        for(let i = 0;i < this.etiquetas.length; i++){
            console.log("- " + this.etiquetas[i]);
        }
    }
    
    this.actualizarFecha = function(paramFecha){
        let data = Date.parse(paramFecha);

        if(data != NaN){
            this.fecha = data;
        }


    }
    
    this.anyadirEtiquetas = function(...argumentos){
        for(let i = 0; i < this.etiquetas.length; i++){
            if(this.etiquetas.includes(argumentos[i], 0)){
                gastos.push(argumentos[i]);
                idGasto++;
            }  
        }
    }
    
    this.borrarEtiquetas = function(...argumen){
        let entrada;
    
        for(let i = 0; i < this.etiquetas.length; i++){
            if(this.etiquetas.includes(argumen[i], 0)){
                entrada = this.etiquetas.indexOf(argumen[i],0);
                this.etiquetas.splice(entrada, 1); 
                idGasto--;
            }  
        }
    } 



    if(fec){
        this.actualizarFecha(fec);
    }

    if(etiq){
        this.anyadirEtiquetas(etiq);
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

