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
        let tagList = "";
        let localDate = new Date(this.fecha).toLocaleString();

        this.etiquetas.forEach((i) => {
            tagList += `- ${i}\n`
        })

        let message = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${localDate}\nEtiquetas:\n${tagList}`;
        return(message);
    },

    this.actualizarDescripcion = function(newDescripcion) {

        this.descripcion = newDescripcion;
    },
    
    this.actualizarValor = function(newValor) {

        if(newValor > 0 && !isNaN(newValor))
            this.valor = newValor;
    },

    this.anyadirEtiquetas = function(...newEtiqueta) {

        newEtiqueta.forEach((i) =>{
            if(!this.etiquetas.includes(i))
                this.etiquetas.push(i);  
        })
    },
      
    this.borrarEtiquetas = function(...etiquetas) {

        etiquetas.forEach((i) =>{
            this.etiquetas.forEach((j, position) =>{
                if(j.includes(i))
                    this.etiquetas.splice(position, 1);
            })
        })
    },

    this.actualizarFecha = function (newFecha) {
        
        if (!isNaN(Date.parse(newFecha)))
            this.fecha = Date.parse(newFecha);
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

function borrarGasto(id){

    gastos.forEach((i, position) =>{
        if(i.id === id)
            gastos.splice(position,1);
    })
}


function calcularTotalGastos(){
    let result = 0;

    gastos.forEach((i)=>{
        result += i.valor;
    })

    return result;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
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
