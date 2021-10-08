// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(cantidad) {
    let numError= -1;

    if(cantidad >= 0) {
        presupuesto = cantidad;
        return (cantidad);
    }else{
        console.log("Cantidad incorrecta.");
        return (numError);
    }
}

function mostrarPresupuesto(pres) {
    // TODO
    let mensaje; 

    let result = actualizarPresupuesto(pres);

    mensaje ="Tu presupuesto actual es de " + result + " €" ;
    console.log(mensaje);
}

function CrearGasto(descrip,cantid) {
    // TODO
    gasto.descripcion= descrip;
    if(cantid >= 0)
    {
        gasto.valor = cantid;
    }else
        gasto.valor = 0;
    
    return gasto;

}



//Objeto gasto y sus métodos
let gasto = {
    descripcion: "",
    valor: 0
};

function mostrarGasto(){
    console.log("Gasto correspondiente a " + gasto.descripcion + "con valor" + gasto.valor + " €");
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

gasto.mostrarGasto = mostrarGasto;
gasto.actualizarDescripcion = actualizarDescripcion;
gasto.actualizarValor = actualizarValor;


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
