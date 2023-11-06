"use strict";

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

//* FUNCIONES: 

function actualizarPresupuesto(ingreso) {                       //OK 
    if (ingreso >= 0) {
        return presupuesto = ingreso;
    }
    else {
        console.log("Error");
        return -1;
    }
}

function mostrarPresupuesto() {                                 //OK
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
function listarGastos() {                                       //OK
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto++;
    gastos.push(gasto);
}


function borrarGasto(idGasto) {                                 //OK del libro.
    let borrar;
    for (let g of gastos) {
        if (g.id == idGasto) {
            let pos = gastos.indexOf(g);                        // Obj.indexOf(param) busca dentro del obj el índice(pos) donde esta el param
            gastos.splice(pos, 1)                                //splice: borra 1 elem a partir de la pos que le indicamos objeto.splice(pos,cantid.a.Borrar)
            break;
        }
    }
}

function calcularTotalGastos() {
    let totalG = 0;
    for (let g of gastos) {
        totalG += g.valor;
    }
    return totalG;
}

function calcularBalance() {
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}
//Método que devuelve un nuevo array con los elementos del array original(gastos) que cumplan con los criterios especificados en objetoParam.
function filtrarGastos(objetoParam) {
    let res;
    if (!objetoParam || (objetoParam).length === 0) {
        // Si 'gastos' es nulo o indefinido, simplemente retornamos gastos.
        return gasto;
    }
    else{
    let res = gastos.filter(function (gasto) {
        let existe = true;

        if (objetoParam.fdesde) {
            let fdesde = Date.parse(objetoParam.fdesde); // Convierte la fecha (objetoParam.fdesde) a representación numérica con Date.parse
            if (gasto.fecha < fdesde) {
                existe = false;
            }
        }

        if (objetoParam.fHasta) {
            let fHasta = Date.parse(objetoParam.fHasta);
            if (gasto.fecha > fHasta) {
                existe = false;
            }
        }

        if (objetoParam.vMinimo) {
            if (gasto.v < objetoParam.vMinimo) {
                existe = false;
            }
        }

        if (objetoParam.vMaximo) {
            if (gasto.v > objetoParam.vMaximo) {
                existe = false;
            }
        }

        if (objetoParam.descripcionContiene) {
            if (!gasto.descripcion.includes(objetoParam.descripcionContiene)) {
                existe = false;
            }
        }

        if (objetoParam.etiquetasTiene) {
            if (!cumpleEtiquetasTiene(gasto, objetoParam.etiquetasTiene)) {
                existe = false;
            }
        }
    
        return existe; // Devuelve true si el gasto cumple con todos los criterios, de lo contrario, devuelve false
    })
    };
}

    function cumpleEtiquetasTiene(gasto, etiquetasTiene) {
        for (let etiqueta of etiquetasTiene) {
            if (!gasto.etiquetas.includes(etiqueta)) {
                return false;
            }
        }
        return true;
    }

function agruparGastos() { 

}


//* OBJETO

function CrearGasto(descrip, valorIntroducido, date, ...etiquetas) {

   
    //* Métodos del objeto:

    this.mostrarGasto = function () {                           //OK
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function (nuevoTexto) {        //OK dwec_U02_a03_Cpe_s.js
        this.descripcion = nuevoTexto;
    }

    this.actualizarValor = function (valor) {                    //OK Opción libro.

        this.valor = (valor >= 0) ? valor : this.valor;
        /*if (valor >= 0) {
            this.valor = nuevoValor;
        }*/
    }

    this.mostrarGastoCompleto = function () {                     //OK
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`

        for (let e of this.etiquetas) {
            texto += `- ${e}\n`
        }
        return texto;
    };


    this.actualizarFecha = function (date) {                      // Opción Libro
        let fech = Date.parse(date)
        if (fech) {
            this.fecha = fech;
        }
    }

    this.anyadirEtiquetas = function (...etiq) {             // Opción libro, con REST
        for (let e of etiq) {       // procesará cada elemento que se haya pasado como argumento al método.
            if (this.etiquetas.indexOf(e) == -1) { //En cada iteración, indexOf busca el elem. en el array. Devuelve su índice, o -1 si no se encuentra.
                this.etiquetas.push(e);
            }
        }
    }
    this.borrarEtiquetas = function (...etqs) {
        let newetiquetas = [];

        for (let e of this.etiquetas) {
            if (etqs.indexOf(e) == -1) {
                newetiquetas.push(e);
            }
        }
        this.etiquetas = newetiquetas;
    }
    
    this.obtenerPeriodoAgrupacion = function (periodo) {
        var fech = new Date(this.fecha); //crea objeto Date fech con lo que tiene: this.fecha

        switch (periodo) {
            case "mes":    //devuelve la fecha en formato "AAAA-MM"
                return fech.toISOString().substr(0, 7);
            case "anyo": //devuelve la fecha en formato "AAAA"
                return fech.toISOString().substr(0, 4);
            case "dia"://devuelve la fecha en formato "AAAA-MM-DD" 
                return fech.toISOString().substr(0, 10);
            default:
                return console.error("La fecha no es válida");
        } //toISOString():convierte la fecha en una cadena de texto: "AAAA-MM-DDTHH:mm:ss.sssZ"
        //.substr(0, 4):extraer una subcadena de la anterior. Los argumentos especifican el índice de inicio y la longitud de la subcadena que se extraerá
    }

    // Propiedades:
    this.descripcion = descrip;

    if (valorIntroducido > 0) {                        //prodiedad valor= opción condicional ? del libro: "this.valor = (valor >=0) ? valor : 0;"
        this.valor = valorIntroducido;
    }
    else {
        this.valor = 0;
    }
    let fech = Date.parse(date);                     //Opción libro.
    if (fech) {
        this.fecha = fech;
    } else {
        this.fecha = Date.parse(new Date());
    }
    
    this.etiquetas = [];   
    this.anyadirEtiquetas(...etiquetas); //Esto asegura que no haya etiquetas duplicadas en el array

    this.periodo;
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
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
// en objeto Gasto:
/*if (!date) {
 
        this.fecha = new Date(timestamp)
    }
    else { 
        this.fecha = date;
    }
 
    if (etiqueta.length === 0) {
        this.etiquetas = [];
    }
    else{
    this.etiquetas = etiqueta;
    }*/
