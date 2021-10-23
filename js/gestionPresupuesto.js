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

    this.anyadirEtiquetas = function(...etiquetas){
        for(let etiqueta of etiquetas){
            if(this.etiquetas.includes(etiqueta) == false){
                this.etiquetas.push(etiqueta);
            }
        }
    }

    //Comprobamos que las etiquetas que se introducen en el objeto no estén repetidas
    this.anyadirEtiquetas(...etiquetas);

    this.borrarEtiquetas = function(...etiquetas){
        for(let etiqueta of etiquetas){
            let index = this.etiquetas.indexOf(etiqueta);
            if(index != -1){
                this.etiquetas.splice(index,1);
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        let periodoAgrupacion = "";

        if(periodo == "dia" || periodo == "mes" || periodo == "anyo"){

            periodoAgrupacion = new Date(this.fecha).toISOString();

            if(periodo == "dia"){
                periodoAgrupacion = periodoAgrupacion.substring(0,10);
            }else if(periodo == "mes"){
                periodoAgrupacion = periodoAgrupacion.substring(0,7);
            }else if(periodo == "anyo"){
                periodoAgrupacion = periodoAgrupacion.substring(0,4);
            }
        }
        return periodoAgrupacion;
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

function filtrarGastos(filtro){

    let gastosFiltro = gastos;

    if(typeof(filtro) == "object"){

        if(Object.keys(filtro).length != 0){

            if(filtro.hasOwnProperty('fechaDesde') == true){
                let fDesde = Date.parse(filtro.fechaDesde);
                if(!isNaN(fDesde)){
                    gastosFiltro = gastosFiltro.filter(gasto => gasto.fecha >= fDesde);
                }
            }

            if(filtro.hasOwnProperty('fechaHasta') == true){
                let fHasta = Date.parse(filtro.fechaHasta);
                if(!isNaN(fHasta)){
                    gastosFiltro = gastosFiltro.filter(gasto => gasto.fecha <= fHasta);
                }
            }

            if(filtro.hasOwnProperty('valorMinimo') == true){
                let vMinimo = filtro.valorMinimo;
                if(typeof(vMinimo) == "number"){
                    gastosFiltro = gastosFiltro.filter(gasto => gasto.valor >= vMinimo);
                }
            }

            if(filtro.hasOwnProperty('valorMaximo') == true){
                let vMaximo = filtro.valorMaximo;
                if(typeof(vMaximo) == "number"){
                    gastosFiltro = gastosFiltro.filter(gasto => gasto.valor <= vMaximo);
                }
            }

            if(filtro.hasOwnProperty('descripcionContiene') == true){
                let dContiene = filtro.descripcionContiene;
                if(typeof(dContiene) == "string"){
                    gastosFiltro = gastosFiltro.filter(gasto => gasto.descripcion.includes(dContiene));
                }
            }

            if(filtro.hasOwnProperty('etiquetasTiene') == true){
                let eTiene = filtro.etiquetasTiene;
                if(Array.isArray(eTiene) == true){

                    gastosFiltro = gastosFiltro.filter(function(gasto){
                        let existe = false;
                        for(let gast of gasto.etiquetas){
                            for(let tiene of eTiene){
                                if(gast == tiene){
                                    existe = true;
                                }
                            }
                        }
                        if(existe == true){
                            return gasto;
                        }
                    });                 
                    
                }
            }

        }
    }

    return gastosFiltro;
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde/* = "2021-01-01"*/, fechaHasta = new Date(Date.now()).toISOString().substring(0,10)){

    let filtro = {
        etiquetasTiene: etiquetas,
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta
    }

    //let etiquetasTiene = etiquetas;
    
    /*function Filtro(etiquetasTiene, fechaDesde, fechaHasta){
        this.etiquetasTiene = etiquetasTiene;
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
    }*/

    //let filtro = new Filtro(etiquetasTiene, fechaDesde, fechaHasta);

    let gastosFiltro = filtrarGastos(filtro);

    let gastosAgrupar = gastosFiltro.reduce((acc, gasto) => {
        acc[gasto.obtenerPeriodoAgrupacion(periodo)] = (acc[gasto.obtenerPeriodoAgrupacion(periodo)] || 0) + /*1*/gasto.valor;
        return acc;
    },{});

    return gastosAgrupar;


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

}
