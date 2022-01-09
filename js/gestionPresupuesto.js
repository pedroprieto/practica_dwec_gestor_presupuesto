'use strict';

let presupuesto = 0;
let gastos= [];
let idGasto = 0;
function mostrarPresupuesto() {
    
    return `Tu presupuesto actual es de ${presupuesto} €`
}
function actualizarPresupuesto(numero) {
    if(numero > 0){
    
    return presupuesto = numero;
    }
    else{
        return -1
    }
}
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto = idGasto +1;
    gastos.push(gasto);
}
function borrarGasto(id) {
    let pos = gastos.findIndex(gasto => gasto.id === id);
    if (pos != -1) {
        gastos.splice(pos, 1);
    }
}
function calcularTotalGastos (){
    let suma = 0;
    for (let gasto of gastos) {
        suma += gasto.valor;
    }
    return suma
}
function calcularBalance (){
    let gastosTotales = calcularTotalGastos();
    let balance = presupuesto - gastosTotales;
    return balance
}
function listarGastos(){
    return gastos
}
function CrearGasto(descripcion,valor,fecha,...etiquetas) {
    this.descripcion = descripcion;
    
    this.actualizarDescripcion  = function(descripcion){
        this.descripcion = descripcion;
    }
    
    
    this.mostrarGasto = function () {
        return  `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        
    }
    this.actualizarValor = function (valor){
        if (valor > 0 ){
        this.valor = valor;
        }
    }
    if (valor > 0 ){
        this.valor = valor; 
    } 
    else {
        this.valor = 0;
    }
    this.etiquetas = [];
    if(fecha){
        fecha = Date.parse(fecha)
        this.fecha = fecha;
    }
    else{
        fecha = Date.now();
        this.fecha = fecha;
    }
    
    this.actualizarFecha = function(fecha){
    
        fecha = Date.parse(fecha);
        if (fecha){
            this.fecha = fecha;
        }
    }
    
    
    this.anyadirEtiquetas = function(...etiquetas){
        let posicion;
        for (let etiqueta of etiquetas){
            posicion = this.etiquetas.lastIndexOf(etiqueta);
            if(posicion == -1){
                this.etiquetas.push(etiqueta)
            }
        }
    } 
    this.anyadirEtiquetas(...etiquetas) 
    
    this.borrarEtiquetas = function(...etiquetas){
        let posicion;
        for (let etiqueta of etiquetas){
            posicion = this.etiquetas.indexOf(etiqueta);
            if (posicion !=-1){
                this.etiquetas.splice(posicion,1);
            }
        }
        
    }
    this.mostrarGastoCompleto = function(){
        let fecha = new Date(this.fecha);
        let fechaTexto = fecha.toLocaleString();
    
        let etiqueta = "";
        for (let i = 0; i < this.etiquetas.length; i++) {
            etiqueta += `- ${this.etiquetas[i]}\n`;
        }
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaTexto}\nEtiquetas:\n${etiqueta}`;    
    }
    this.obtenerPeriodoAgrupacion=function(periodo){

        let fecha=new Date(this.fecha);
        let diaPeriodo=fecha.getDate();
        let mesPeriodo=fecha.getMonth()+1;
        let anyoPeriodo=fecha.getFullYear();

        if ( mesPeriodo < 10 ){
            mesPeriodo=`0${mesPeriodo}`;
        }
        if ( diaPeriodo < 10 ){
            diaPeriodo=`0${diaPeriodo}`;
        }
        if (periodo === "mes" ){
            return `${anyoPeriodo}-${mesPeriodo}`;
        }
        else if ( periodo === "anyo" ){
            return `${anyoPeriodo}`;
        }
        else if ( periodo === "dia" ){
            return `${anyoPeriodo}-${mesPeriodo}-${diaPeriodo}`;
        }
        else{
            return `${anyoPeriodo}-${mesPeriodo}-${diaPeriodo}`;
        }
    }
}
function filtrarGastos(objecto){
    
    let filtrogastos=gastos.slice();
    if (objecto.valorMinimo){
		filtrogastos=filtrogastos.filter((x) => x.valor > objecto.valorMinimo);
	}
	if (objecto.valorMaximo){
		filtrogastos=filtrogastos.filter((x) => x.valor < objecto.valorMaximo);
	}
    if ( objecto.fechaDesde ){
		filtrogastos=filtrogastos.filter((x) => x.fecha >= Date.parse( objecto["fechaDesde"] ));
    }
    if (objecto.fechaHasta){
		filtrogastos=filtrogastos.filter((x) => x.fecha <= Date.parse(objecto.fechaHasta));
	}
    if (objecto.etiquetasTiene){
		filtrogastos=filtrogastos.filter((x) => {
			for(let etiqueta of x["etiquetas"]){
				if (objecto.etiquetasTiene.indexOf(etiqueta) > -1){
					return x;
				}
			}
		});
	}
    if (objecto.descripcionContiene){
		filtrogastos=filtrogastos.filter((x) => x.descripcion.indexOf(objecto.descripcionContiene
        ) > -1 );
	}
	
	return filtrogastos;
}
function transformarListadoEtiquetas(etiquetas){
    let filtro = etiquetas.match(/[a-z0-9]+/gi);
    return filtro;
}

function agruparGastos(periodo,etiquetas,fechaDesde, fechaHasta){


    return filtrarGastos({ etiquetasTiene:etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta})
            .reduce(function(acumula,objeto){
                let objPerAgru=objeto.obtenerPeriodoAgrupacion(periodo)
                if(!acumula[objPerAgru]){
                    acumula[objPerAgru]=0;
                }
                acumula[objPerAgru]+=objeto.valor;
                return acumula;
            },{});     
}
function cargarGastos(nuevosGastos){

    gastos = nuevosGastos;

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
            agruparGastos,
            gastos,
            transformarListadoEtiquetas,
            cargarGastos
        }