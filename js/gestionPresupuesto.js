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
    },

    this.obtenerPeriodoAgrupacion = function(periodo){
        let result = "";
        let showDate = new Date(this.fecha);

        let d = String(showDate.getDate()).padStart(2,'0')
        let mm = String(showDate.getMonth()+1).padStart(2,'0')
        let yyyy = String(showDate.getFullYear());

        switch(periodo){
            case "dia" :
                result = `${yyyy}-${mm}-${d}`;
                return result;
            case "mes" :
                result = `${yyyy}-${mm}`;
                return result;
            case "anyo" :
                result = `${yyyy}`
                return result;
            default:
                return `Error`;
        }
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

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){
    let gastosFiltrados;
    gastosFiltrados = gastos.filter(function(gasto){

        let exist = true;
        if(fechaDesde)
            if(gasto.fecha < Date.parse(fechaDesde)) exist = false;
     
        if(fechaHasta)
            if(gasto.fecha > Date.parse(fechaHasta)) exist = false;
    
        if(valorMinimo)
            if(gasto.valor < valorMinimo) exist = false;
    
        if(valorMaximo)
            if(gasto.valor > valorMaximo) exist = false;
     
        if(descripcionContiene)
            if(!gasto.descripcion.includes(descripcionContiene)) exist = false;
    
        if(etiquetasTiene){
            let inside = false;

            for (let i = 0; i < gasto.etiquetas.length; i++) {                   
                for (let j= 0; j < etiquetasTiene.length; j++) {

                    if(gasto.etiquetas[i] == etiquetasTiene[j]) 
                        inside = true;                  
                }
            }

            if(inside == false) 
                exist = false;
        }

        return exist;
    });

    return gastosFiltrados;  
}


function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {

    let filter = {etiquetasTiene : etiquetas, fechaDesde : fechaDesde, fechaHasta : fechaHasta}
    let returnFiltrarGastos = filtrarGastos(filter);
    let groupBy;

    groupBy = returnFiltrarGastos.reduce((acc, item) => {
                let perReduced = item.obtenerPeriodoAgrupacion(periodo);
                if (acc[perReduced] == null)
                    acc[perReduced] = item.valor;
                else 
                    acc[perReduced] += item.valor;
                return acc;
               }, {});
    return groupBy;
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
}
