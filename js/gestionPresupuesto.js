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
    if (fecha == null || isNaN(fecha)) // (!fecha) <== mirar que honda
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

    this.borrarEtiquetas = function(...etiquetasBorrar){
        for (let i = 0; i < etiquetasBorrar.length; i++){
            for (let j = this.etiquetas.length; j >= 0; j--)
                if (etiquetasBorrar[i] == this.etiquetas[j])
                    this.etiquetas.splice(j, 1);
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        let fecha = new Date (this.fecha);
        let fechaString = fecha.toISOString();

        if (periodo == "dia"){
            return fechaString.substring(0,10);
        }   
        else if (periodo == "mes"){
            return fechaString.substring(0,7);
        }
        else if (periodo == "anyo"){
            return fechaString.substring(0,4);
        }
    }
}


//JS II

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

// JS III
function filtrarGastos(opciones){

    return gastos.filter(function (gasto){
        let res = true;

        if (opciones.fechaDesde){
            if (gasto.fecha < Date.parse(opciones.fechaDesde))
                res = false;
        }

        if (opciones.fechaHasta){
            if (gasto.fecha > Date.parse(opciones.fechaHasta))
                res = false;
        }
        
        if (opciones.valorMinimo){
            if (gasto.valor < opciones.valorMinimo)
                res = false;
        }
        
        if (opciones.valorMaximo){
            if (gasto.valor > opciones.valorMaximo)
                res = false;
        }
        
        if (opciones.descripcionContiene){
            if (!gasto.descripcion.includes(opciones.descripcionContiene))
                res = false;
        }
        
        if (opciones.etiquetasTiene){
            let encontrado = false;

            for (let eti of gasto.etiquetas){
                for (let etiTiene of opciones.etiquetasTiene){
                    if (eti.toLowerCase() == etiTiene.toLowerCase())
                        encontrado = true;
                }
            }
            if (!encontrado)
                res = false; 
        }

        return res;
    })
}

function agruparGastos(periodo = mes, etiquetas, fechaDesde, fechaHasta){
    
    let opciones = {};
    opciones.periodo = periodo;
    opciones.etiquetasTiene = etiquetas;
    opciones.fechaDesde = fechaDesde;
    opciones.fechaHasta = fechaHasta;

    let gastosFiltrados = filtrarGastos(opciones);

    return gastosFiltrados.reduce((acc, gasto) => {
        let pAgrup = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acc[pAgrup])
            acc[pAgrup] += gasto.valor;
        else
            acc[pAgrup] = gasto.valor;

        return acc;

    }, {});
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
    filtrarGastos,
    agruparGastos
};
