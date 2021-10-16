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

function CrearGasto(descripcion, valor, fecha, etiquetas) {
    this.descripcion = descripcion;

    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    //Falta seguir las normas de la práctica
    this.fecha = fecha;

    //Falta seguir las normas de la práctica
    this.etiquetas = etiquetas;

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

//Función de 1 parámetro que eliminará de la variable global gastos el objeto gasto cuyo id haya sido pasado como parámetro. Si no existe un gasto con el id proporcionado
//no hará nada. 
function borrarGasto(gastoBorrado)
{
        /* TODO. 

    Seguir por aqui
    
    Para buscarlo algo similar del manual: let result = arr.find(function(item, index, array)

    Para borrarlo algo similar del manual: arr.splice(start[, deleteCount, elem1, ..., elemN])

    https://es.javascript.info/array-methods#splice
     */
}


function calcularTotalGastos()
{
    // TODO
}

function calcularBalance()
{
    // TODO
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