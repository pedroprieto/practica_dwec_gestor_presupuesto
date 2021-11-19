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
    this.descripcion= descrip;
    this.valor = 0;
    this.fecha = fec;
    this.etiquetas = [];

    if(cantid >= 0)
    {
        this.valor = cantid;
    }else
        this.valor = 0;

    if (etiq == null){
        this.etiquetas= [];
    }else{
        this.etiquetas= etiq;
    }

    if(fec == null){
        this.fecha = new Date();
    }else{
        this.fecha = new Date(Date.parse(fec));
    }



    this.mostrarGasto = function(){
        return("Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €");
    }

    this.actualizarDescripcion = function(descr){
        this.descripcion = descr;
    }

    this.actualizarValor = function(val){
        if(val >= 0)
            this.valor = val;
        else
            return;
    }

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}

