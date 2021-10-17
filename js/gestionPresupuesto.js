// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
'use strict'
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// TODO: Variable global


function actualizarPresupuesto(cantidad) {
    if (CompruebaCantidad(cantidad) <= 0) {
        console.log('No se pueden introducir números negativos');
        return -1;
    } else {
        presupuesto = cantidad;
        console.log(cantidad)
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CompruebaCantidad(cantidad) {
    if (cantidad < 0 || isNaN(cantidad)) {
        return -1;
    }
    else {
        return cantidad;
    }
}
function CrearGasto(descripcion, valorGasto, fecha = new Date(), ... etiquetas) {

    this.descripcion = descripcion;
    this.etiquetas = (etiquetas.length === 0) ? etiquetas = [] : etiquetas;
    
    this.fecha = Date.parse(fecha);

    if (CompruebaCantidad(valorGasto) > -1) {
        this.valor = valorGasto;
    } else {
        this.valor = 0;
    }

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor) {
        if (CompruebaCantidad(nuevoValor) > -1) {
            this.valor = nuevoValor;
        }
    }

    this.actualizarFecha = function (fecha) {
        var fechaParseada = Date.parse(fecha);
        if (isNaN(fechaParseada)) {
            this.fecha = this.fecha;
        } else {
            this.fecha = fechaParseada;
        }
    }
    
    this.mostrarGastoCompleto = function(){
        let fechaLocalizada = new Date(this.fecha).toLocaleString();
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocalizada}\nEtiquetas:\n- ${this.etiquetas.join('\n- ')}\n`
        return texto;
    }

    

    this.anyadirEtiquetas = function(...etiquetasAnyadir){
        for (let i = 0; i < etiquetasAnyadir.length; i++) {
            let etiqueta = etiquetasAnyadir[i];
            if(!this.etiquetas.includes(etiqueta)){
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.borrarEtiquetas = function(...etiquetasBorrar){
        for (let i = 0; i < etiquetasBorrar.length; i++) {
            let etiqueta = etiquetasBorrar[i];
            let indiceElemento = this.etiquetas.indexOf(etiqueta);
            if(indiceElemento !== -1){
                this.etiquetas.splice(indiceElemento,1);
            }
        }
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto(idGasto){
    for (let i = 0; i < gastos.length; i++) {
        let gasto = gastos[i];
        if(gasto.id == idGasto){
            gastos.splice(i,1);
        }  
    } 
}

function calcularTotalGastos(){
    let sumaGastos = 0;
    for (let i = 0; i < gastos.length; i++) {
        
        sumaGastos = sumaGastos + gastos[i].valor;
    }

    return sumaGastos;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    anyadirGasto,
    listarGastos,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
