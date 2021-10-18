"use strict";

//Variables globales
let presupuesto = 0;

//Almacenará el listado de gastos que vaya introduciendo el usuario. Inicialmente contendrá un array vacío.
let gastos = [];

//Se utilizará para almacenar el identificador actual de cada gasto que se vaya añadiendo. Su valor inicial será 0. Se irá incrementando con cada gasto que se añada.
let idGasto = 0;


function actualizarPresupuesto(presupuestoActualizado) { 

    let presupuestoAuxiliar = presupuestoActualizado;

    if (presupuestoAuxiliar >= 0) {   
        presupuesto = presupuestoAuxiliar;    
        } else {
            presupuestoAuxiliar = -1;     
        }

    return presupuestoAuxiliar;               
}


function mostrarPresupuesto() {
    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
}

//Actualiza la función constructora para que incluya la fecha y las etiquetas (ver apartado de Objeto gasto). Los parámetros adicionales de la función deben ir a continuación de los existentes.
//Sección del manual Parámetros REST y operador SPREAD ... para expandir etiquetas.
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;

    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    //fecha - Almacenará la fecha en que se crea el gasto en forma de timestamp
    if (fecha)
    {
        this.fecha = Date.parse(fecha);  
        //El parámetro fecha deberá ser un string con formato válido que pueda entender la función Date.parse. Si la fecha no es válida (no sigue el formato indicado), 
        //se deberá almacenar la fecha actual en su lugar.
    }   
    else
    {
        this.fecha = Date.now(fecha);  
        //Si no se indica el parámetro fecha, se almacenará en la propiedad fecha la fecha actual.  
    }
    
    //etiquetas - Almacenará en un array el listado de etiquetas (categorías) asociadas al gasto.
    if (etiquetas === null)
    {
        this.etiquetas = [];
        //Si no se indican los parámetros de etiquetas, se almacenará en la propiedad etiquetas un array vacío.
    }
    else
    {
        this.etiquetas = etiquetas;
    }
    
    //Añade o modifica los siguientes métodos del objeto gasto:
    //mostrarGastoCompleto - Función sin parámetros que devuelva el texto multilínea siguiente (ejemplo para un gasto con tres etiquetas)
    //Para mostrar la fecha en formato localizado puedes utilizar el método toLocaleString() (referencia de toLocaleString()).
    this.mostrarGastoCompleto = function()
    {
        let fechaFormatoLocalizado = new Date(fecha);
        //Si utilizasemos solo fecha.toLocaleString() sin hacer new Date(fecha) nos mostrará la fecha pero no con el formato adecuado y no pasa la prueba. 

        let gasto = (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaFormatoLocalizado.toLocaleString()}\nEtiquetas:\n- ${etiquetas.join ("\n- ")}\n`);
        //Podemos utilizar toLocaleString en diferentes localizaciones con los parentesis: event.toLocaleString('en-GB') y también cambiará el formato de las horas entre 12h y 24h.
        //arr.join(glue). (contrario a split) Creamos un string de arr elementos unidos con glue (pegamento) entre ellos. Luego es ir ajustando para pasar la prueba, ya sea \n o todos seguidos ":"
        //Como el ejemplo del manual

        return gasto;
    }

    //actualizarFecha - Función de 1 parámetro que actualizará la propiedad fecha del objeto. 
    //Deberá recibir la fecha en formato string que sea entendible por la función Date.parse. Si la fecha no es válida, se dejará sin modificar.
    this.actualizarFecha = function()
    {
        // TODO
    }

    this.anyadirEtiquetas = function()
    {
        // TODO
    }

    this.borrarEtiquetas = function()
    {
        // TODO
    }


    this.mostrarGasto = function() {
        let gasto = (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        return gasto;
    }

    this.actualizarDescripcion = function (descripcionActualizada) {
        this.descripcion = descripcionActualizada;
    }

    this.actualizarValor = function (valorActualizado) {
        if (valorActualizado > 0) {
            this.valor = valorActualizado;
        }
    }
}

//Función sin parametros que devolverá la variable global gastos.
function listarGastos()
{
    return gastos;
}

//Función de 1 parámetro que realizará tres tareas:
function anyadirGasto(gastoAnyadido)
{
    //Añadir al objeto gasto pasado como parámetro una propiedad id cuyo valor será el valor actual de la variable global idGasto.
    gastoAnyadido.id = idGasto;

    //Incrementar el valor de la variable global idGasto.
    idGasto++;

    //Añadir el objeto gasto pasado como parámetro a la variable global gastos. El gasto se debe añadir al final del array.
    gastos.push(gastoAnyadido);
}

//Función de 1 parámetro que eliminará de la variable global gastos el objeto gasto cuyo id haya sido pasado como parámetro. Si no existe un gasto con el id proporcionado no hará nada. 
function borrarGasto(gastoBorrado)
{    
    //Nota para mi futuro yo. 
    /*
    let encontrado;
    encontrado = gastos.find(item => item.id == gastoBorrado);

    if (encontrado = true)
    {
        gastos.splice(encontrado, 1);
    }

    El problema de find es que nos devuelve que encontrado es true y el item es devuelto, pero splice no tiene un índice, "un lugar". 
    Encontrado es su valor/true , pero nada más, no nos sirve para ponerle en una "posicion".     
    */

    let encontrado;  
    encontrado = gastos.findIndex(item => item.id == gastoBorrado);
    //Cumple la misma función pero esta vez en vez de devolvernos true/item o undefined, nos devuelve la posición exacta o -1 si no lo encuentra. 
    
    if (encontrado >= 0)
    {
        gastos.splice(encontrado, 1);
        //De esta forma le decimos que elimine desde el índice: encontrado, la cantidad de 1. 
    }    
}

//Función sin parámetros que devuelva la suma de todos los gastos creados en la variable global gastos. De momento no los agruparemos por período temporal (lo haremos en sucesivas prácticas).
function calcularTotalGastos()
{
    let totalGastos = 0;

    for (let i=0; i < gastos.length; i++)
    {
        totalGastos = totalGastos + gastos[i].valor;
    }

    return totalGastos;
}

//Función sin parámetros que devuelva el balance (presupuesto - gastos totales) disponible. De momento no lo obtendremos por período temporal (lo haremos en sucesivas prácticas). 
//Puede utilizar a su vez la función calcularTotalGastos. 
function calcularBalance()
{
    let balance;

    balance = presupuesto - calcularTotalGastos();

    return balance;
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