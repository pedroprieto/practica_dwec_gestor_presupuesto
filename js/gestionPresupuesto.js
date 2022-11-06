"use strict"

let presupuesto = 0; 
let gastos = [];
let idGasto = 0;


 //*OBJETO:
function CrearGasto(descrip, val, fecha, ...etiqueta) {  //*Propiedades del objeto

   
    this.descripcion = descrip;
    if (val > 0) {
        this.valor = val;
    } else {
        this.valor = 0;      
    }
    if (!fecha)
    {
        this.fecha = Date.parse(new Date()); // Almacena en fecha, la fecha actual en formato timestamp. - funciona
    }
    else { 
        this.fecha = Date.parse(fecha); // Almacena en fecha, la fecha que pasan por parametros. - funciona  
    }
    this.etiquetas = [];
    if (etiqueta.length > 0) {                         //Funciona
        for (let i in etiqueta)
        { 
            this.etiquetas.push(etiqueta[i]);          //Funciona.
        }
    }
                                                      //* Métodos del objeto
    this.mostrarGasto = function () {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    };
    this.actualizarDescripcion = function (description) {
        this.descripcion = description;
    };
    this.actualizarValor = function (val) {
        if (val > 0) {
            this.valor = val;
        }
    };
    this.actualizarFecha = function (newDate) {        //Funciona.
        var nuevaFecha = Date.parse(newDate);   
        if (nuevaFecha) {
            this.fecha = nuevaFecha;
         }
    };
    this.anyadirEtiquetas = function (...etique) {     //Funciona
        for (let item of etique) {
            var compruebaEtiqueta= this.etiquetas.includes(item)
            if (!compruebaEtiqueta)
                this.etiquetas.push(item);   
        }
    };                                           
    this.borrarEtiquetas = function (...etique) {      //Funciona
        for (let pos = 0; pos < this.etiquetas.length; pos++) { 
            for (let i = 0; i < etique.length; i++) {
                var obtienePos = this.etiquetas.indexOf(etique[i]);
                if(obtienePos >= 0)
                    this.etiquetas.splice(obtienePos,1);
            }
        }      
    };
    this.mostrarGastoCompleto = function () {          //Funciona
        var resultado = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n"
            + "Fecha: " + new Date(this.fecha).toLocaleString() + "\n" + "Etiquetas:\n";
            for (let i = 0; i < this.etiquetas.length; i++) {
                resultado = resultado + "- "+ this.etiquetas[i] + "\n";
            }
        return resultado;
    };
}

 //*FUNCIONES

function actualizarPresupuesto(par1) {                 //Funciona
    if (par1 >= 0) {
        presupuesto = par1;
        return presupuesto;
    } else {
        console.log('Error');
        return -1;
    }
}

function mostrarPresupuesto() {
    let text = "Tu presupuesto actual es de " + presupuesto + " €";   //funciona
    return text;
}

function listarGastos() {                          //Funciona.
    return gastos; 
}

function anyadirGasto(paramGasto) {                //Funciona.
    paramGasto.id = idGasto;
    idGasto++;
    gastos.push(paramGasto); 
}
  
function borrarGasto(idBorrar) {                   //Funciona.
    for (let i = 0; i < gastos.length; i++)
    {
        if (gastos[i].id === idBorrar)
            gastos.splice(i, 1);
    } 
}

function calcularTotalGastos() {                   //Funciona.
    let total = 0; 
    for (let i of gastos) {
        total = total + i.valor;             
    }
    return total;
}

function calcularBalance() {                 
    var gastoTotal = calcularTotalGastos();       //Funciona.
    var res = presupuesto - gastoTotal;
    return res;
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
    calcularBalance,
}
