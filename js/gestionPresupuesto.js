"use strict"
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
let gastos = [];
let idGasto = 0;
// TODO: Variable global l
 
// Funcion actualizar presupuesto
function actualizarPresupuesto(dinero) {
    if (dinero >= 0){
        presupuesto = dinero;
        return presupuesto;
    }
    else 
        return -1;
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`);
} 
 
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
    this.descripcion = descripcion;
    
    if (isNaN(valor) || valor < 0)
        this.valor = 0;
    else
        this.valor = valor;
        
    fecha = Date.parse(fecha);
    if (fecha == null || isNaN(fecha))
        this.fecha = new Date();
    else
        this.fecha = fecha;
    
    // JS II

    if (etiquetas == null)
        this.etiquetas = [];
    else
        this.etiquetas = etiquetas;


    this.mostrarGasto = function() {
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }
    this.actualizarDescripcion = function(descripcion) {
        this.descripcion = descripcion;
    }
    this.actualizarValor = function(valor) {
        if (valor >= 0){
            this.valor = valor;
        }
    }

    //JS II

    this.mostrarGastoCompleto = function(){
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        let fechaActual = new Date(this.fecha).toLocaleString();
        texto += `Fecha: ${fechaActual}\n`;
        texto += `Etiquetas:\n`

        for (let etis of etiquetas){
            texto += `- ${etis}\n`
        }

        return texto;
    }

    this.actualizarFecha = function(fecha){
        fecha = Date.parse(fecha);

        if(!isNaN(fecha))
            this.fecha = fecha;
    }

    this.anyadirEtiquetas = function(...etiquetasNuevas){
       for (let eti of etiquetasNuevas){
        if (this.etiquetas.includes(eti) == false)
            this.etiquetas.push(eti);
        
       }
    }

    this.borrarEtiquetas = function (...etiquetasBorrar){
        for (let i = 0; i < etiquetasBorrar.length; i++){
            for (let j = this.etiquetas.length; j >= 0; j--)
                if (etiquetasBorrar[i] == this.etiquetas[j])
                    this.etiquetas.splice(j, 1);
        }
    }
}

//pruebas
let valor = 44.55;
        let gasto1 = new CrearGasto("descripción del gasto", valor, "2021-10-06T13:10Z", "casa", "supermercado", "comida" );
        gasto1.borrarEtiquetas("hola", "supermercado");
        console.log(gasto1.borrarEtiquetas())

//pruebas

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    for (let i = 0; i < gastos.length; i++){

        if(gastos[i].id == id)
            gastos.splice(i, 1);
    }
}

function calcularTotalGastos() {
    let sum = 0;

    for (let gas of gastos)
        sum += gas.valor;
    
    return sum;
}

function calcularBalance() {
    let totalGastos = calcularTotalGastos();

    let balance = presupuesto - totalGastos;

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
