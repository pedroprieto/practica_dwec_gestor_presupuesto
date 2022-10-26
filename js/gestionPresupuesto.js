"use strict"

let presupuesto = 0; 
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(par1) {
    if (par1 >= 0) {
        presupuesto = par1;
        return presupuesto;
    } else {
        console.log('Error');
        return -1;
    }       
}

function mostrarPresupuesto() {
    let text = "Tu presupuesto actual es de " + presupuesto + " €";
    return text; 
}

function CrearGasto(descrip, val, fecha, etiqueta) {
    let fecha;
    let etiquetas;
    this.descripcion = descrip;
    if (val > 0) {
        this.valor = val;
    } else {
        this.valor = 0;      
    }
    this.mostrarGasto = function () {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor +" €";       
    };
    this.actualizarDescripcion = function (description) {

        this.descripcion = description;
    };
    this.actualizarValor = function (val) {
        if (val > 0) {
            this.valor = val;
        }
    };

    if (si esta vacio fecha)
    {
        fecha = new Date(timestamp); // Almacena en fecha, la fecha actual en formato timestamp.
    }else { 
       fecha = new Date(Date.parse(fecha)); // Almacena en fecha, la fecha que pasan por parametros.
    }
                    //TODO: crear las condiciones de if para fecha y etiquetas=[]; si no entra por parametro.
    //! Pendiente ejercicio Función CrearGasto y método obj gasto.
    // this.etiquetas.anyadirEtiquetas(etiquet);//no se si va
    this.mostrarGastoCompleto = function () { 

        var resultado = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " € \n" + this.fecha + ":";
       //! Pendiente  método obj gasto:  además..Para mostrar la fecha en formato localizado puedes utilizar el método toLocaleString()
        //TODO: Falta añadir etiquetas, realizare un bucle para mostrar el array de Etiquetas:

        return resultado;
    }
}
//listarGastos: Elimina un elem del array "gasto" pasando por parametro el id. 
function listarGastos() { 
    return gastos;
}
function anyadirGasto() { }
function borrarGasto() { }
function calcularTotalGastos() { }
function calcularBalance() { }

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
    calcularBalance,
}
