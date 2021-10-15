"use strict";

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {
    if(cantidad >= 0){
        presupuesto = cantidad;
    }else if(cantidad < 0){
        presupuesto = -1;
    }

    return presupuesto;
}

function mostrarPresupuesto() {
    let mensaje = `Tu presupuesto actual es de ${presupuesto} €`
    return mensaje;
}

function CrearGasto(descripcion = "No hay descripción", valor = 0, fecha = "", ...etiquetas) {

    this.descripcion = descripcion;

    if(valor >= 0){
        this.valor = valor;
    }else{
        this.valor = 0;
    }

    if(fecha == "" || isNaN(Date.parse(fecha))){
        this.fecha = Date.now();
    }else{
        this.fecha = Date.parse(fecha);
    }

    this.etiquetas = [];

    this.anyadirEtiquetas = function(...etiquetas){
        for(let etiqueta of etiquetas){
            if(this.etiquetas.includes(etiqueta) == false){
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.anyadirEtiquetas(...etiquetas);
    //this.etiquetas = this.anyadirEtiquetas(...etiquetas);
    //this.etiquetas = etiquetas;

    this.mostrarGasto = function(){
        let mensaje = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        return mensaje;
    };

    this.mostrarGastoCompleto = function(){
        let listaEtiquetas = "";

        for(let etiqueta of this.etiquetas){
            listaEtiquetas += `- ${etiqueta}\n`;
        }

        let fechalocale = new Date(this.fecha).toLocaleString();

        let mensaje = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        mensaje += `Fecha: ${fechalocale}\n`;
        mensaje += `Etiquetas:\n${listaEtiquetas}`;
        return mensaje;
    }

    this.actualizarDescripcion = function(descripcion = this.descripcion){
        this.descripcion = descripcion;
    };

    this.actualizarValor = function(valor){
        if(valor >= 0){
            this.valor = valor;
        }
    };

    this.actualizarFecha = function(fecha){
        if(fecha != "" && !isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha);
        }
    };

    /*this.anyadirEtiquetas = function(...etiquetas){
        for(let etiqueta of etiquetas){
            if(this.etiquetas.includes(etiqueta) == false){
                this.etiquetas.push(etiqueta);
            }
        }
    }*/

    this.borrarEtiquetas = function(...etiquetas){
        for(let etiqueta of etiquetas){
            let index = this.etiquetas.indexOf(etiqueta);
            if(index != -1){
                this.etiquetas.splice(index,1);
            }
        }
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    if(typeof(gasto) === "object"){
        gasto.id = idGasto;
        gastos.push(gasto);
        idGasto++;
    }
}

function borrarGasto(numId){
    if(typeof numId == 'number' && numId >= 0){
        let index = gastos.indexOf(gastos.find(x=>x.id == numId));
        if(index != -1){
            gastos.splice(index,1);
        }
    }
}

function calcularTotalGastos(){
    let total = 0;

    for(let gasto of gastos){
        total = total + gasto.valor;
    }

    return total;
}

function calcularBalance(){
    let balance = presupuesto - calcularTotalGastos();
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
    calcularBalance,
}
