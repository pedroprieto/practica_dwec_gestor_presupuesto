// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";
// TODO: Variables globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(actual) {
    // TODO
    if (!isNaN(actual) && actual >= 0) {
        presupuesto = actual;
        return presupuesto;
    }
    else {
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    let mensaje;
    mensaje = `Tu presupuesto actual es de ${presupuesto} €`
    return mensaje;
}

function listarGastos () {
    // TODO
    //Función sin parámetros que devolverá la variable global gastos.
    return gastos;
}
function anyadirGasto (gasto) {
    // TODO
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto (id) {
    // TODO
    //let pos = 0;
    //let gasto = id;
    for (let i=0; i<gastos.length; i++ ) {
        if (gastos[i].id == id) {
            //pos = gastos.indexOf(i);
            gastos.splice(i, 1 );
        }
    }
}
function calcularTotalGastos () {
    // TODO
    let suma = 0;
    for (let i of gastos) {
        suma = suma + i.valor;
    }
    return suma;
}
function calcularBalance () {
    // TODO balance (presupuesto - gastos totales)
    let balance = 0;
    balance = presupuesto - calcularTotalGastos();
    return balance;
}
function filtrarGastos (opciones) {
    let gastosFiltrados = {};
         gastosFiltrados = gastos.filter(function(gasto) {
            let resultado = true;
            if (opciones.fechaDesde) {
                if (gasto.fecha < Date.parse(opciones.fechaDesde)) {
                    resultado = false;
                }
            }
            if (opciones.fechaHasta) {
                if (gasto.fecha > Date.parse(opciones.fechaHasta)) {
                    resultado = false;
                }
            }
            if (opciones.valorMinimo) {
                if (gasto.valor < opciones.valorMinimo) {
                    resultado = false;
                }
            }
            if (opciones.valorMaximo) {
                if (gasto.valor > opciones.valorMaximo) {
                    resultado = false;
                }
            }
            if (opciones.descripcionContiene) {
                if (!gasto.descripcion.includes(opciones.descripcionContiene)) {
                    resultado = false;
                }
            }
            if (opciones.etiquetasTiene) {
                let count = 0;
                for (let etq of opciones.etiquetasTiene) {
                    if (gasto.etiquetas.indexOf(etq)  > -1) {
                        count++;
                    }
                }
                if (count == 0) {
                    resultado = false;
                } 
            }
            return resultado;
        });
        return gastosFiltrados;

}

function agruparGastos (periodo, etiquetas, fechaDesde, fechaHasta) {
    let opciones = {};
    opciones.periodo = periodo;
    opciones.etiquetasTiene = etiquetas;
    opciones.fechaDesde = fechaDesde;
    opciones.fechaHasta = fechaHasta;
    let gastosFiltrados = filtrarGastos(opciones);
    let funcionReduce = function( acc, gasto) {
        let pAgrup = gasto.obtenerPeriodoAgrupacion(periodo);
        if (acc[pAgrup]) {
            acc[pAgrup] += gasto.valor;
        } else {
            acc[pAgrup] = gasto.valor;
        }
        //console.log( "GAsto : " + gasto.valor +" " + new Date(gasto.fecha));
        return acc;
    };
    let acumulador = {};
    return gastosFiltrados.reduce(funcionReduce, acumulador);

}
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    // Propiedades del objeto
    this.descripcion = descripcion;

    this.valor = (valor >= 0 ) ? valor : 0;

    if(!fecha) {
        fecha = Date.parse(new Date());
        this.fecha = fecha;
    }
    else {
        fecha = Date.parse(fecha);
        this.fecha = fecha;
    }
    this.etiquetas = [];
    if ( etiquetas.length != 0) {
        for (let i in etiquetas){
            this.etiquetas.push(etiquetas[i]);
        }
    } else {
        this.etiquetas = [];
    }
    //Funciones del objeto gasto

    this.mostrarGasto = function() {
        let mensaje;
        mensaje = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        return mensaje;
    },
    this.mostrarGastoCompleto = function() {
        let mensaje;
        mensaje = this.mostrarGasto() + ".";
        mensaje = mensaje + `\nFecha: ${new Date (this.fecha).toLocaleString()}\n`;
        mensaje += 'Etiquetas:\n';
        for ( let i = 0; i < this.etiquetas.length; i++) {
            mensaje += `- ${this.etiquetas[i]}\n`;
        }
        return mensaje;
    },
    this.actualizarFecha = function (nuevaFecha) {
        nuevaFecha = Date.parse(nuevaFecha);
        if (nuevaFecha){
            this.fecha = nuevaFecha;
        }

    },
    this.anyadirEtiquetas = function(...etiquetaNueva) {
        let pos;
        for (let i of etiquetaNueva){
            pos = this.etiquetas.indexOf(i);
            if (pos == -1) {
                this.etiquetas.push(i);
            }
        }
    },
    this.borrarEtiquetas = function (...etiquetaEliminadas) {
        let pos;
        for (let i of etiquetaEliminadas){
            pos = this.etiquetas.indexOf(i);
            if (pos != -1) {
                this.etiquetas.splice(pos, 1);
            }
        }
    },
    this.actualizarDescripcion = function(actualizaDescripcion) {
        this.descripcion = actualizaDescripcion;
        return actualizaDescripcion;
    },
    this.actualizarValor = function(nuevoValor) {
        if(typeof nuevoValor == 'number' &&  nuevoValor >= 0) {
            this.valor = nuevoValor;
        } 
    },
    this.obtenerPeriodoAgrupacion = function (periodo) {
        // como agrupo?
        let fecha = new Date(this.fecha);
        let fechaInter =fecha.toISOString();
        if (periodo == "dia") {
            return fechaInter.substring(0,10);
        } else if (periodo == "mes") {
            return fechaInter.substring(0,7);
        } else if (periodo == "anyo") {
            return fechaInter.substring(0,4);
        }
        return agruparPeriodo;
    }
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
