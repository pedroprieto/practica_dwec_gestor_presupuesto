"use strict"

let presupuesto = 0; 
let gastos = [];
let idGasto = 0;


 //*OBJETO:
function CrearGasto(descrip, val, fecha, ...etiqueta) {  //*Propiedades del objeto

    this.descripcion = descrip;
    if (val > 0) {
        this.valor = val;
    } else {
        this.valor = 0;      
    }
    if (!fecha)
    {
        this.fecha = Date.parse(new Date()); // Almacena en fecha, la fecha actual en formato timestamp. - funciona
    }
    else { 
        this.fecha = Date.parse(fecha); // Almacena en fecha, la fecha que pasan por parametros. - funciona  
    }
    this.etiquetas = [];
    if (etiqueta.length > 0) {                         //Funciona
        for (let i in etiqueta)
        { 
            this.etiquetas.push(etiqueta[i]);          //Funciona.
        }
    }
                                                      //* Métodos del objeto
    this.mostrarGasto = function () {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    };
    this.actualizarDescripcion = function (description) {
        this.descripcion = description;
    };
    this.actualizarValor = function (val) {
        if (val > 0) {
            this.valor = val;
        }
    };
    this.actualizarFecha = function (newDate) {        //Funciona.
        var nuevaFecha = Date.parse(newDate);   
        if (nuevaFecha) {
            this.fecha = nuevaFecha;
         }
    };
    this.anyadirEtiquetas = function (...etique) {     //Funciona
        for (let item of etique) {
            var compruebaEtiqueta= this.etiquetas.includes(item)
            if (!compruebaEtiqueta)
                this.etiquetas.push(item);   
        }
    };                                           
    this.borrarEtiquetas = function (...etique) {      //Funciona
        for (let pos = 0; pos < this.etiquetas.length; pos++) { 
            for (let i = 0; i < etique.length; i++) {
                var obtienePos = this.etiquetas.indexOf(etique[i]);
                if(obtienePos >= 0)
                    this.etiquetas.splice(obtienePos,1);
            }
        }      
    };
    this.mostrarGastoCompleto = function () {          //Funciona
        var resultado = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n"
            + "Fecha: " + new Date(this.fecha).toLocaleString() + "\n" + "Etiquetas:\n";
            for (let i = 0; i < this.etiquetas.length; i++) {
                resultado = resultado + "- "+ this.etiquetas[i] + "\n";
            }
        return resultado;
    };
    this.obtenerPeriodoAgrupacion = function (periodo) { 

        var fecha = new Date(this.fecha);
        var fechaInternacional = fecha.toISOString(); // fechaInternacional= cadena de texto que devuelve la fecha del objeto en formato internacional.  
        if (periodo == "anyo")
            return fechaInternacional.substring(0,4)      
        if (periodo == "mes")
            return fechaInternacional.substring(0,7)
        else(periodo == "dia")
        return fechaInternacional.substring(0,10)
    };
}

 //*FUNCIONES

function actualizarPresupuesto(par1) {                 //Funciona
    if (par1 >= 0) {
        presupuesto = par1;
        return presupuesto;
    } else {
        console.log('Error');
        return -1;
    }
}

function mostrarPresupuesto() {
    let text = "Tu presupuesto actual es de " + presupuesto + " €";   //funciona
    return text;
}

function listarGastos() {                          //Funciona.
    return gastos; 
}

function anyadirGasto(paramGasto) {                //Funciona.
    paramGasto.id = idGasto;
    idGasto++;
    gastos.push(paramGasto); 
}
  
function borrarGasto(idBorrar) {                   //Funciona.
    for (let i = 0; i < gastos.length; i++)
    {
        if (gastos[i].id === idBorrar)
            gastos.splice(i, 1);
    } 
}

function calcularTotalGastos() {                   //Funciona.
    let total = 0; 
    for (let i of gastos) {
        total = total + i.valor;             
    }
    return total;
}

function calcularBalance() {                 
    var gastoTotal = calcularTotalGastos();       //Funciona.
    var res = presupuesto - gastoTotal;
    return res;
}
function filtrarGastos(obj) {  //!Pendiente de hacer desde: obj.etiquetasTiene
    
    // if(obj)
    let objFiltrado = [];                                 
    //fechaDesde = "", fechaHasta = "", valorMinimo, valorMaximo, escripcionContiene.toLowerCase(), etiquetasTiene = [],);
    if (Object.keys(obj).length === 0) {                  
        return gastos;
    }
    else {
        if (obj.fechaDesde) { 
            let fechaD = Date.parse(obj.fechaDesde);        //Funciona.

            if (fechaD) {
                objFiltrado = gastos.filter(elem => elem.fecha >= fechaD);        
            }
            else {
                objFiltrado = objFiltrado.filter(elem => elem.fecha >= fechaD);     
            }
        }
        if (obj.fechaHasta) {
            let fechaH = Date.parse(obj.fechaHasta);                 //Funciona.
            if (fechaH) {
                objFiltrado = objFiltrado.filter(elem => elem.fecha <= fechaH); 
            }  
        }
        if (obj.valorMinimo) {                             //Funciona.
            if ((obj.fechaDesde || obj.fechaHasta || obj.descripcionContiene) && objFiltrado.length > 0){
                objFiltrado = objFiltrado.filter(elem => elem.valor >= obj.valorMinimo);
            }
            else {
                objFiltrado = gastos.filter(elem => elem.valor >= obj.valorMinimo);
                }
            }
        if (obj.valorMaximo) {                           //Funciona.
            if ((obj.fechaDesde || obj.fechaHasta || obj.valorMinimo || obj.descripcionContiene) && objFiltrado.length>0) {
                objFiltrado = objFiltrado.filter(elem => elem.valor <= obj.valorMaximo);
            }
            else {
                objFiltrado = gastos.filter(elem => elem.valor <= obj.valorMaximo);
            }
        }
        if (obj.descripcionContiene) {                      //Funciona.
            if (objFiltrado.length === 0) {            
                objFiltrado = gastos.filter(elem => elem.descripcion.toLowerCase().indexOf(obj.descripcionContiene.toLowerCase())==0);   
            }
            else {
                objFiltrado = objFiltrado.filter(elem => elem.descripcion.toLowerCase().indexOf(obj.descripcionContiene.toLowerCase()) == 0);
            }
        }
        if (obj.etiquetasTiene) {                               //! No funciona 
            if (objFiltrado.length === 0)
                objFiltrado = gastos.filter(elem.find((elemX, id, etiquetasTiene) => gastos.etiquetas.indexOf(etiquetasTiene)));
        }
    //    (gastos.etiquetas.find((elemX, id, etiquetasTiene) => gastos.etiquetas.indexOf(etiquetasTiene)));
        return objFiltrado; 
    }
 }

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta ) {   // Funciona tutoria 31/10 min:20´
    var gastosAgrupados = {};
    var gastosFiltrados;
    tiempo.periodo = periodo;
    tiempo.etiqueta = etiquetas;
    tiempo.fechaDesde = fechaDesde;
    tiempo.fechaHasta = fechaHasta;
    gastosFiltrados = filtrarGastos(gastosAgrupados);
  
    let functionReduce = function (acumulador, elemento) {             //*cada elemento del arr es un gasto.
        let pAgrup = elemento.obtenerPeriodoAgrupacion(periodo);       //*pAgrup periodo a agrupar año,mes o dia en concreto.

        if (acumulador[pAgrup]) {                                      //*el acumulador tiene una propiedad existente ya con XX fecha? 
            acumulador[pAgrup] = acumulador[pAgrup]  + elemento.valor; //* suma lo que tenía más el nuevo valor. 
        }
        else 
            acumulador[pAgrup] = elemento.valor;                        //* La 1º vez que lo llamo estará vacio y entra en else. Se crea xx fecha.
        return acumulador;
    };
    let acumulador = { };                                              //* creo un Array vacío. 
    return gastos.reduce(functionReduce, acumulador)                   //* Devuelve un Obj,cuya propiedad periodo es = a la suma de gastos. 
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
