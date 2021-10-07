// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

var gasto = new CrearGasto();//constructor de objeto gasto
gasto.descripcion='';
gasto.valor = 0;

function mostrarGasto(){//OK

    console.log("Gasto correspondiente a "+gasto.descripcion+" con valor "+gasto.valor+" €");//obtener los valores de las propiedades del objeto gasto
}

function actualizarDescripcion(parametro2){
    
    //let b="Hola";
    gasto.descripcion=parametro2;

}                                               //descripcion en formato string
                                                //descripcion en formato numerico

function actualizarValor(parametro3){
    //let c=3;
    if (c>0)
        return gasto.valor=parametro3+gasto.valor;

}
// TODO: Variable global
let  presupuesto = 0;

function actualizarPresupuesto(parametro1) {
    // TODO
    if (parametro1>0)
        {
            presupuesto=presupuesto+parametro1;
            return presupuesto;
        }
    else
        {
            console.log("Error el valor es negativo");
            return (-1);
        }
}

function mostrarPresupuesto() {

    return ("Tu presupuesto actual es de "+presupuesto+" €");
}

function CrearGasto(descripcion,valor) {
    // TODO
    if(valor<0)
        valor = 0;
    this.descripcion=descripcion;
    this.valor=valor;
    
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
