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

function CrearGasto(descrip, val, fecha, ...etiqueta) {
    //Propiedades del objeto
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
    if (fecha)
    {
        fecha = new Date(timestamp); // Almacena en fecha, la fecha actual en formato timestamp.
        this.fecha = fecha;
    }
    else { 
        fecha = new Date(Date.parse(fecha)); // Almacena en fecha, la fecha que pasan por parametros.
        this.fecha = fecha;
    }
    this.etiquetas = [];
    if (this.etiquetas.length >= 0) {
        for (let estiqueta in etiquetas)
        { 
            this.etiquetas.push(estiquetas[estiqueta]); //Ver si funciona y apuntar el porq.
        }
    }
    else this.etiquetas = []; 
                    //TODO: crear las condiciones de if para fecha y etiquetas=[]; si no entra por parametro.
    this.actualizarFecha = function (newDate) { 
        nuevaFecha = date.parse(newDate);
        if (nuevaFecha) {
            this.fecha = nuevaFecha;
         }

    };
    this.anyadirEtiquetas = function (...etique) {
        this.etiquetas.push[etique];

     };//no se si va
    this.borrarEtiquetas = function (...etique) { };
    this.mostrarGastoCompleto = function () { 
     var resultado = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " € \n" ;
        resultado = resultado + "Fecha: " this.fecha + "\n Etiquetas: \n";
        for (let i = 0; i < this.etiquetas; i++) {
            resultado = resultado + this.etiquetas[i] + "\n";
        }         
     //! Pendiente  método obj gasto:  además..Para mostrar la fecha en formato localizado puedes utilizar el método toLocaleString()
        return resultado;
    }
}
//Función sin parám. devuelve var global gastos - Elimina un elem del array "gasto" pasando por parametro el id. 
function listarGastos() { 
    return gastos;
}

function anyadirGasto(gasto) { 
    gastos.id = idGasto;
    idGasto++;
    gastos.push(gasto); //Porqué el push?
}
function borrarGasto(id) { 
   let pos = 0;
}
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
