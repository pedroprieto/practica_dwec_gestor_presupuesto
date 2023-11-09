"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


function actualizarPresupuesto(nuevoValorPresupuesto) {

    if ((nuevoValorPresupuesto < 0) || (isNaN(nuevoValorPresupuesto))) {
        console.log (`El presupuesto no puede tener valor negativo.`);
        return -1;
    }
    else {
        presupuesto = nuevoValorPresupuesto;
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    console.log (`Tu presupuesto actual es de ${presupuesto} €`);
    return `Tu presupuesto actual es de ${presupuesto} €`;
    
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
    this.descripcion = descripcion;
    if (isNaN(valor) || (valor < 0)) {
        this.valor = 0;
    }
    else {
        this.valor = valor;
    }
    
    //1º inicializo this.etiquetas con un array vacío.
    //2º si la longitud del array etiquetas es mayor que 0 es que se ha introducido algún valor,
    //así que puedo asignar dichos valores a this.etiquetas, en caso contrario le asigno un array vacío.
    this.etiquetas = []; 
    this.etiquetas = (etiquetas.length > 0) ? this.etiquetas.concat(etiquetas) : [];
    
    //Si fecha no tiene valor o el string introducido no es válido, me quedo con la fecha actual
    //en caso contrario con la fecha dada
    if (isNaN(Date.parse(fecha)) || fecha == undefined) {
        this.fecha = Date.parse(Date().toString());
    }
    else {
        this.fecha = Date.parse(fecha);
    }

    this.mostrarGasto = function() {
        console.log (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function (descripcion) {
        this.descripcion = descripcion; 
    }

    this.actualizarValor = function (nuevoValor) {
        if (isNaN(nuevoValor) || (nuevoValor < 0)) {
            //this.valor = 0;
        }
        else if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    } 
    
    this.mostrarGastoCompleto = function () {

        let fechaMostrar = new Date(this.fecha);
        let etiquetasMostrar ="";

        for (let itemEtiqueta of this.etiquetas) {
            etiquetasMostrar += `\n- ${itemEtiqueta}`
        }

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaMostrar.toLocaleString()}\nEtiquetas:${etiquetasMostrar}\n`;
    }
    
    this.actualizarFecha = function (fechaActualizar) {
        //Si fecha no tiene valor o el string introducido no es válido, me quedo con la fecha actual
        //por lo que no hago nada, en caso contrario con la fecha dada.
        if (!(isNaN(Date.parse(fechaActualizar)) || fechaActualizar == undefined)) {
            this.fecha = Date.parse(fechaActualizar);
        }
    }

    this.anyadirEtiquetas = function (...etiquetasAnyadir) {
        //Si no hay etiquetas no añado nada. En caso de haber alguna compruebo si ya existe y en caso de existir dicha etiqueta, no hago nada. Para ver si existen o no uso 'includes'.
        //Hasta terminar de revisar todas y añadirlas o no según se vea si existen o no. Las añado al fiunal del array con 'push'.
        if (etiquetasAnyadir.length > 0) {
            for (let itemEtiquetaAnyadir of etiquetasAnyadir) {
                if (!(this.etiquetas.includes(itemEtiquetaAnyadir))) {
                    //Si la etiqueta no está previamente creada, la añado.
                    this.etiquetas.push (itemEtiquetaAnyadir);
                }
            }
        }
    }

    this.borrarEtiquetas = function (...etiquetasBorrar) {
        //Si no hay etiquetas no hago nada. En caso contrario busco el índice de la etiqueta con 'indexOf' y las voy eliminado.
        if (etiquetasBorrar.length > 0) {
            for (let itemEtiquetaBorrar of etiquetasBorrar) {
                if (this.etiquetas.indexOf(itemEtiquetaBorrar) > -1) {
                    this.etiquetas.splice(this.etiquetas.indexOf(itemEtiquetaBorrar),1);
                }
            }
        }
    }

}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gastoAnyadir) {
    //Añado a id el idGasto actual
    gastoAnyadir.id = idGasto;
    //Incremento idGasto en  una unidad
    idGasto++;
    //Añado gastoAnyadir al array gastos
    gastos.push(gastoAnyadir);
}

function borrarGasto(idGastoBorrar) {
    
    //Busco la posición del elemento buscado por su 'id' con findIndex, y lo borro usando 'splice'
    let indice = gastos.findIndex((item) => item.id == idGastoBorrar);
    gastos.splice (indice,1);    
}

function calcularTotalGastos() {

}

function calcularBalance() {

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