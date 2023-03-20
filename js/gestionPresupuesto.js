// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// TODO: Variable global

var presupuesto = 0;    
var gastos = [];
var idGasto = 0;

function actualizarPresupuesto(value) {
    // TODO
    let retValue = 0;

    if(value < 0 || isNaN(value)) {
        retValue = -1;

    }else{
        presupuesto = value;
        retValue = value;
    }

    return retValue;
}

function mostrarPresupuesto() {
    // TODO
     return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcionIn, valorIn, fechaIn = Date.now(), ...etiquetasIn ) {
    // TODO
    //PROPIEDADES
    if (valorIn < 0 || isNaN(valorIn))
        valorIn = 0;

    if (typeof fechaIn === "string"){

        if(isNaN(Date.parse(fechaIn))) 
            fechaIn = Date.now();
        else
            fechaIn = Date.parse(fechaIn);
    }

    this.descripcion = descripcionIn,
    this.valor = parseFloat(valorIn),
    this.etiquetas = [...etiquetasIn],
    this.fecha = fechaIn

    //METODOS
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },

    this.mostrarGastoCompleto = function() {
        let compString = "";
        let dateString = new Date(this.fecha).toLocaleString();
        compString += `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${dateString}\nEtiquetas:\n`;
        for (let i = 0; i < this.etiquetas.length; i++) 
            compString += `- ${this.etiquetas[i]}\n`
        
        return compString;
    },

    this.actualizarDescripcion = function(newDescripcion) {
        this.descripcion = newDescripcion;
    },
    
    this.actualizarValor = function(newValor) {
        if(newValor > 0 && !isNaN(newValor))
            this.valor = newValor;
    },

    this.anyadirEtiquetas = function(...newEtiquetas) {
        for (let i = 0; i < newEtiquetas.length; i++) {

            if(this.etiquetas.includes(newEtiquetas[i]))
                continue;
            this.etiquetas.push(newEtiquetas[i]);
        }
    },

    this.borrarEtiquetas = function (...etiquetasToDel) {
        for (let i = 0; i < etiquetasToDel.length; i++) {
            for (let f = 0; f < this.etiquetas.length; f++) {

                if (etiquetasToDel[i] === this.etiquetas[f])
                    this.etiquetas.splice(f, 1);
            }
        }
    },

    this.actualizarFecha = function (nuevaFecha) {
        if (!isNaN(Date.parse(nuevaFecha)))
            this.fecha = Date.parse(nuevaFecha);
    }
}   

function listarGastos(){
    return gastos;
}

function anyadirGasto(newGasto){
    newGasto.id = idGasto;
    idGasto++;
    gastos.push(newGasto);
}

function borrarGasto(idIn){
    gastos.forEach(gasto, i =>{
        if(gasto.id.includes(idIn))
            gastos.splice(i, 1);
    })
}

function calcularTotalGastos(){
    let lativeTotal = 0;

    gastos.forEach(gasto, i =>{
        lativeTotal += parseFloat(gasto[i].valor);
    })
    
    return lativeTotal;
}

function calcularBalance(){
    return(presupuesto - calcularTotalGastos());
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
