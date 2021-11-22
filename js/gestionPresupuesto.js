'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if (valor <= 0 || isNaN(valor)) {       
        return -1;
    }else{       
        presupuesto = valor;
        return valor;
    }   
}

function mostrarPresupuesto() {
    // TODO   
        let texto;
        texto = `Tu presupuesto actual es de ${presupuesto} €`;
        return texto;
}

// OBJETO GASTO
function CrearGasto(descripcion, valor, fecha = new Date(), ... etiquetas) {
    // TODO

    this.anyadirEtiquetas = function(...etiquetasNuevas){
            
        for (let i = 0; i < etiquetasNuevas.length; i++) {
            
            if(this.etiquetas.includes(etiquetasNuevas[i]) == false){// si no lo encuentra que lo añada
                this.etiquetas.push(etiquetasNuevas[i]);
            }
        }           
    }

    this.descripcion = descripcion;
    this.valor = (valor > 0) ? valor : 0;
    //this.etiquetas = (etiquetas.length === 0) ? etiquetas = [] : etiquetas;
    this.etiquetas = [];
    this.anyadirEtiquetas(...etiquetas);
    this.fecha = Date.parse(fecha);
    

    this.mostrarGasto = function(){
        let texto;
        texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        return texto;
    }

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    }

    this.actualizarValor = function(valor){
        this.valor = (valor >= 0) ? valor : this.valor;
    }

    this.mostrarGastoCompleto = function(){//Conseguida

        let fechModificada = new Date(fecha);
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechModificada.toLocaleString()}\nEtiquetas:\n- ${this.etiquetas.join('\n- ')}\n`
        return texto;
    }

    this.actualizarFecha = function(valor){ 
        
        let fechaModificada = Date.parse(valor); // pasamos la fehca introducida a un valor numerico
        if(!isNaN(fechaModificada)){ // si el valor no es un numero dejamos como esta la fecha, en caso contrario la actualizamos
            this.fecha = fechaModificada;
        }         
                             
    }

    this.borrarEtiquetas = function(...etiquetasNuevas){
           
        for (let i = 0; i < etiquetasNuevas.length; i++) {
        
            let indice = this.etiquetas.indexOf(etiquetasNuevas[i]);// si no encuentra ninguna coincidencia devuelve -1
            if(indice !== -1){
                this.etiquetas.splice(indice, 1);
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){

        let fechaNueva = new Date(fecha).toISOString();
        let fechaModificada = "";

        if(periodo == "dia"){
            fechaModificada = fechaNueva.substr(0,10);
        }else if(periodo == "mes"){
            fechaModificada = fechaNueva.substr(0,7);
        }else if(periodo == "anyo"){
            fechaModificada = fechaNueva.substr(0,4);
        }
        return fechaModificada;
    }
}

//FUNCIONES PRACTICA 2
function listarGastos(){   
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id){
    
   let indice = gastos.findIndex(gasto => gasto.id == id);// buscamos el indice donde coincida el id
   if(indice !== -1){
       gastos.splice(indice, 1);
   }
}

function calcularTotalGastos(){

    let total = 0;

    for (let i = 0; i < gastos.length; i++) {
        
        total = total + gastos[i].valor;
    }

    return total;
}

function calcularBalance(){

    let gastosTotales = calcularTotalGastos();
    let balance = presupuesto - gastosTotales;
    return balance;

}

//FUNCIONES PRACTICA 3

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){
   

           let gastosFiltrados;
           
           gastosFiltrados = gastos.filter(function(gasto){

            let existe = true;
            if(fechaDesde){
                if(gasto.fecha < Date.parse(fechaDesde)){
                    existe = false;
                }
            }
            if(fechaHasta){
                if(gasto.fecha > Date.parse(fechaHasta)){
                    existe = false;
                }
            }
            if(valorMinimo){
                if(gasto.valor < valorMinimo){
                    existe = false;
                }
            }
            if(valorMaximo){
                if(gasto.valor > valorMaximo){
                    existe = false;
                }
            }
            if(descripcionContiene){
                //if(gasto.valor >= valorMinimo && gasto.valor <= valorMaximo){
                    if(!gasto.descripcion.includes(descripcionContiene)){
                        existe = false;
                    }
                //}  
            }
            if(etiquetasTiene){
                let contiene = false;                   
                    for (let i = 0; i < gasto.etiquetas.length; i++) {                   
                        for (let j= 0; j < etiquetasTiene.length; j++) {
                            if(gasto.etiquetas[i] == etiquetasTiene[j]){
                                contiene = true;
                            }                 
                        }
                    }
                    if(contiene == false){
                        existe = false;
                    }  
            }

                return existe;
           });
           
           
        return gastosFiltrados;  
       
}


function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta){

    let etiquetasTiene = etiquetas;

    if(!fechaDesde){
        fechaDesde = "2020-01-01";
    }
    if(!fechaHasta){
        fechaHasta =  new Date(Date.now()).toISOString().substr(0,10);
    }

    let gastosCreados = filtrarGastos({fechaDesde, fechaHasta, etiquetasTiene});

    let resultado = gastosCreados.reduce((acc , gasto) => {

        let propiedad = gasto.obtenerPeriodoAgrupacion(periodo);
        
        acc[propiedad] = ( acc[propiedad] || 0) + gasto.valor;

        return acc;

    }, {});

    /*let resultado = gastosCreados.reduce((acc, item) => {
            acc[item.obtenerPeriodoAgrupacion(periodo)] = (acc[item.obtenerPeriodoAgrupacion(periodo)] || 0) + item.valor;
            return acc;
    }, {});/*
    
    /*
    let resultado = gastosCreados.reduce((acc, gasto) => ({       
        ...acc,
        [gasto.obtenerPeriodoAgrupacion(periodo)]: (acc[gasto.obtenerPeriodoAgrupacion(periodo)] || 0) +gasto.valor,     
    }), {});*/
    
    return resultado;
}


// Practica 7 expresiones regulares

function transformarListadoEtiquetas(etiquetas){

    let arrayFiltrado = etiquetas.match(/[a-zA-Z0-9]+/gi);
    return arrayFiltrado;
}


// PRACTICA 8 ALMACENAMIENTO

function cargarGastos(gastosNuevos){

    gastos = gastosNuevos;
    
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
    transformarListadoEtiquetas,
    cargarGastos
}
