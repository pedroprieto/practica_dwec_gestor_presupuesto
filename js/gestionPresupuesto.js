// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

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

function CrearGasto(descrip,cantid, fec, etiq) {
    // TODO
    gasto.descripcion= descrip;
    gasto.fecha = fec;

    if(cantid >= 0)
    {
        gasto.valor = cantid;
    }else
        gasto.valor = 0;

    if (etiq == null){
        gasto.etiquetas= [];
    }else{
        gasto.etiquetas= etiq;
    }

    if(fec == null){
        gasto.fecha = new Date();
    }else{
        gasto.fecha = new Date(Date.parse(fec));
    }
    return (gasto);
}



//Objeto gasto y sus métodos
let gasto = {
    descripcion: "",
    valor: 0,
    fecha = new Date(timestamp),
    etiquetas = []
};

function mostrarGasto(){
    return("Gasto correspondiente a " + gasto.descripcion + " con valor " + gasto.valor + " €");
}

function actualizarDescripcion (descr) {
    gasto.descripcion = descr;
}

function actualizarValor (val) {
    if(val >= 0)
        gasto.valor = val;
    else
        return;
}

//métodos práctica2
function mostrarGastoCompleto(){
    console.log("Gasto correspondiente a " + gasto.descripcion + "con valor" + gasto.valor + " €");
    console.log("Fecha: " + gasto.fecha);
    console.log("Etiquetas:");
    for(i = 0;i < gasto.etiquetas.length; i++){
        console.log("- " + gasto.etiquetas[i]);
    }
}

function actualizarFecha(paramFecha){
    gasto.fecha = new Date(Date.parse(paramFecha));
}

function anyadirEtiquetas(...argumentos){
    for(i = 0; i < gasto.etiquetas.length; i++){
        if(gasto.etiquetas.includes(argumentos[i], 0)){
            gastos.push(argumentos[i]);
        }  
        if(idGasto > 0) {
            idGasto++;
        }
    }
}

function borrarEtiquetas(...argumen){
    let entrada;

    for(i = 0; i < gasto.etiquetas.length; i++){
        if(gasto.etiquetas.includes(argumentos[i], 0)){
            entrada = gasto.etiquetas.indexOf(argumen[i],0);
            gasto.etiquetas.splice(entrada, 1); 
        }  
        if(idGasto > 0) {
            idGasto++;
        }
    }
}


gasto.mostrarGasto = mostrarGasto;
gasto.actualizarDescripcion = actualizarDescripcion;
gasto.actualizarValor = actualizarValor;


gasto.mostrarGastoCompleto = mostrarGastoCompleto;
gasto.actualizarFecha = actualizarFecha;
gasto.anyadirEtiquetas = anyadirEtiquetas;
gasto.borrarEtiquetas = borrarEtiquetas;


//Funciones práctica 2

function listarGastos(){
    for(i = '0'; i < gastos.length;i++){
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
    gastos.etiquetasa.splice(id, 1);
    if(idGasto > 0){
        idGasto = idGasto -1;
    }
}

function calcularTotalGastos(){
    let totalGastos = 0;
    for(i=0; i <= gasto.etiquetas.length;i++){
        totalGastos += gasto.etiquetas[i];
    }

    return(totalGastos);
}

function calcularBalance(){
    let tG;
    let balance;

    tG = gastos.calcularTotalGastos();
    balance = presupuesto - tG;

    return(balance);
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

