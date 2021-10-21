// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

//gasto.descripcion='';
//gasto.valor = 0;

// function mostrarGasto()  //metodo
// {

//     return("Gasto correspondiente a "+gasto.descripcion+" con valor "+gasto.valor+" €");//obtener los valores de las propiedades del objeto gasto
// }

// function actualizarDescripcion(descripcion) //metodo
// {
    
//     gasto.descripcion=descripcion;

// }                                               //descripcion en formato string
//                                                 //descripcion en formato numerico

// function actualizarValor(valor) //metodo
// {
    
//     if (isNaN(valor)==false && valor>0)
//     {
//         gasto.valor=valor;
//     }

// }
// TODO: Variable global
let  presupuesto = 0;
let descripcion='';
let valor=0;
function actualizarPresupuesto(parametro) {
    // TODO
    if (isNaN(parametro)==false && parametro>0)
        {
            presupuesto=parametro;
            return presupuesto;
        }
    else
        {
            console.log("Error no es una valor positivo");
            return (-1);
        }
}

function mostrarPresupuesto() {

    return ("Tu presupuesto actual es de "+presupuesto+" €");
}
function CrearGasto(descripcion,valor) 
{
    // TODO
    var gasto = new Object();
    if(isNaN(valor)==true || valor<0)
        valor = 0;
    gasto.descripcion=descripcion;
    gasto.valor=valor;
    gasto.actualizarDescripcion=function(desc) { gasto.descripcion=desc};
    gasto.actualizarValor=function(valor) {if (isNaN(valor)==false && valor>0) { gasto.valor=valor}};
    gasto.mostrarGasto=function() {return ("Gasto correspondiente a "+gasto.descripcion+" con valor "+gasto.valor+" €")};
    return gasto;
    
}

//let gasto = CrearGasto(descripcion,valor);//constructor de objeto gasto
//gasto.actualizarDescripcion("Nueva descripción de gasto 1");
//gasto.actualizarValor(15);
//console.log(gasto.mostrarGasto());

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
