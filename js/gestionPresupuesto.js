"use strict";

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

//* FUNCIONES: 

function actualizarPresupuesto(ingreso) {                       //OK 
    if (ingreso >= 0) {
        return presupuesto = ingreso;
    }
    else {
        console.log("Error");
        return -1;
    }
}

function mostrarPresupuesto() {                                 //OK
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
function listarGastos() {                                       //OK
    return gastos;
}

function anyadirGasto(o) {
}

function borrarGasto() {
}

function calcularTotalGastos() {
}

function calcularBalance() {
}

//* OBJETO

function CrearGasto(descrip, valorIntroducido, date, ...etiquetas) {

   
    //* Métodos del objeto:

    this.mostrarGasto = function () {                           //OK
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function (nuevoTexto) {        //OK dwec_U02_a03_Cpe_s.js
        this.descripcion = nuevoTexto;
    }

    this.actualizarValor = function (valor) {                    //OK Opción libro.

        this.valor = (valor >= 0) ? valor : this.valor;
        /*if (valor >= 0) {
            this.valor = nuevoValor;
        }*/
    }

    this.mostrarGastoCompleto = function () {                     //OK
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`

        for (let e of this.etiquetas) {
            texto += `- ${e}\n`
        }
        return texto;
    };


    this.actualizarFecha = function (date) {                      // Opción Libro
        let fech = Date.parse(date)
        if (fech) {
            this.fecha = fech;
        }
    }

    this.anyadirEtiquetas = function (...etiq) {             // Opción libro
        for (let e of etiq) {
            if (this.etiquetas.indexOf(e) == -1) {
                this.etiquetas.push(e);
            }
        }
    }
    this.borrarEtiquetas = function (...etqs) {
        let newetiquetas = [];

        for (let e of this.etiquetas) {
            if (etqs.indexOf(e) == -1) {
                newetiquetas.push(e);
            }
        }
        this.etiquetas = newetiquetas;
    }

    // Propiedades:
    this.descripcion = descrip;

    if (valorIntroducido > 0) {                        //prodiedad valor= opción condicional ? del libro: "this.valor = (valor >=0) ? valor : 0;"
        this.valor = valorIntroducido;
    }
    else {
        this.valor = 0;
    }
    let fech = Date.parse(date);                     //Opción libro.
    if (fech) {
        this.fecha = fech;
    } else {
        this.fecha = Date.parse(new Date());
    }
    
    this.etiquetas = [];   
    this.anyadirEtiquetas(...etiquetas);
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
// en objeto Gasto:
/*if (!date) {
 
        this.fecha = new Date(timestamp)
    }
    else { 
        this.fecha = date;
    }
 
    if (etiqueta.length === 0) {
        this.etiquetas = [];
    }
    else{
    this.etiquetas = etiqueta;
    }*/
