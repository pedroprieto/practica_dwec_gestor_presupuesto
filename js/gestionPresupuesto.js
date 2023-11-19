// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variables globales
"use strict";
//Presupuesto = Valor inicial: 0
let presupuesto = 0;
// gastos = Inicialmente contendrá un array vacío.
let gastos = [];
//ID = Su valor inicial será 0. Se irá incrementando con cada gasto que se añada.
let idGasto = 0;

//Crea las siguientes funciones
//#### FUNCIONES ####

//Función de 1 parámetro que se encargará de actualizar la variable global presupuesto
function actualizarPresupuesto(actualiza) {
    // TODO
    if ( isNaN(actualiza) || actualiza <=0) {
        return -1;
        // para web alert("No es un Numero, Revisa el valor introducido");
    } else 
    presupuesto = actualiza;
    return presupuesto;
}

//Función sin parámetros que se encargará de devolver el texto del presupuesto
function mostrarPresupuesto() {
    // TODO
    let mensaje = `Tu presupuesto actual es de ${presupuesto} €`;
    return mensaje;
}

//Función sin parámetros que devolverá la variable global gastos
function listarGastos () {
    return  gastos;

}

//Función de 1 parámetro que realizará Añadir el gasto, incrementar ID, añadir el valor
function anyadirGasto (gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

//Función de 1 parámetro que eliminará el gasto de la ID
function borrarGasto (identificador) {
    for (let i=0; i < gastos.length; i++) {
        if ( gastos[i].id == identificador) {
            gastos.splice(i , 1)
        }
    }
}

//Función sin parámetros que devuelva la suma de todos los gastos
function calcularTotalGastos () {
    let suma = 0;
    for (let i of gastos) {
        suma += i.valor;
    }
    
    return suma; // quitar tantos decimales falla test aquí.toFixed(2);
}

//Función sin paràmetros que devuelva el balance disponible
function calcularBalance () {
    let balance = 0;
    balance = presupuesto - calcularTotalGastos();
    //En el balance no da error el test
    return balance.toFixed(2);
}

//Función de un parámetro que devolverá un subconjunto de los gastos existentes
function filtrarGastos (opciones) {
    return gastos.filter(function (listado) {
        let resultado = true;
        if ( opciones.fechaDesde) {
            if(listado.fecha < Date.parse(opciones.fechaDesde)) {
                resultado = false;
            }
        }
        if ( opciones.fechaHasta) {
            if ( listado.fecha > Date.parse(opciones.fechaHasta))
            resultado = false;
        }
        if ( opciones.valorMinimo) {
            if ( listado.valor < opciones.valorMinimo) {
                resultado = false;
            }
        }
        if (opciones.valorMaximo) {
            if(listado.valor > opciones.valorMaximo) {
                resultado = false;
            }
        }
        if ( opciones.descripcionContiene ) {
            if (!listado.descripcion.includes (opciones.descripcionContiene) )
            resultado = false;
        }
        if (opciones.etiquetasTiene) {
            let count = 0;
            for (let etq of opciones.etiquetasTiene) {
                if (listado.etiquetas.indexOf(etq)  > -1) {
                    count++;
                }
            }
            if (count == 0) {
                resultado = false;
            } 
        }

        return resultado;
    }) 
}

/*Función de cuatro parámetros que devolverá un objeto 
con los resultados de realizar una agrupación por período temporal */
function agruparGastos (periodo, etiquetas, fechaDesde, fechaHasta) {
    
    //En primer lugar se llamará a filtrarGastos para obtener el subconjunto de gastos
    let gastosFiltrados = filtrarGastos({
        etiquetasTiene : etiquetas,
        fechaDesde : fechaDesde,
        fechaHasta : fechaHasta,
    });

    //Ejecutar reduce sobre el conjunto de gastos filtrados
    return gastosFiltrados.reduce(function(acc , gasto) {

        //Buscamos el periodo para sumar los gastos
        let sumaPeriodo = gasto.obtenerPeriodoAgrupacion(periodo);
        if(acc[sumaPeriodo]) {
            acc[sumaPeriodo] += gasto.valor;
        } else {
            acc[sumaPeriodo] = gasto.valor;
        }
       
        return acc;
    }, {});
}


//Función constructora que se encargará de crear un objeto gasto
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    //Almacenará la descripción del gasto en formato cadena
    this.descripcion = descripcion;

    //Almacenará el valor del gasto en formato numérico
    this.valor = (valor >= 0 ) ? valor : 0;

    //Fecha del gasto
    if(!fecha) {
        fecha = Date.parse(new Date());
        this.fecha = fecha;
    } else {
        fecha = Date.parse(fecha);
        this.fecha = fecha;
    }

    //Etiquetas del objeto gasto
    this.etiquetas = [];
    if (etiquetas.length != 0) {
        for (let i in etiquetas) {
            this.etiquetas.push(etiquetas[i]);
        } 
    }else {
            this.etiquetas = [];
    }
 
   //### Metodos del Objeto ###

   //Función sin parámetros que muestre el texto correspondiente al gasto 
     this.mostrarGasto = function (mostrarGasto) {
        let mensaje = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        return mensaje;
    }

    //Función sin parámetros que devuelva el texto multilínea
    this.mostrarGastoCompleto = function () {
        let mensaje = this.mostrarGasto();
        mensaje += `.\nFecha: ${new Date (this.fecha).toLocaleString()}\n`;
        mensaje += `Etiquetas:\n`;
        for (let i = 0; i < etiquetas.length; i++) {
            mensaje += `- ${this.etiquetas[i]}\n`;
        }
        return mensaje;
    }

    //Función de 1 parámetro que actualizará la descripción del objeto
    this.actualizarDescripcion = function (actualizarDescripcion) {
        this.descripcion = actualizarDescripcion;
        return actualizarDescripcion;

    }

    //Función de 1 parámetro que actualizará el valor del objeto
    this.actualizarValor = function (actualizarValor) {
        if (!isNaN(actualizarValor) && actualizarValor >= 0) {
            this.valor = actualizarValor;
            return actualizarValor;
        } else valor = valor;
    }

    //Funcion de un parametro que actualizara la fecha del gasto
    this.actualizarFecha = function (actualizaFecha) {
        actualizaFecha = Date.parse(actualizaFecha);
        if (actualizaFecha) {
            this.fecha = actualizaFecha;
        } //else this.fecha = this.fecha;
    }

    //Funcion que actuliza las etiquetas del objeto gasto
    this.anyadirEtiquetas = function (...etiquetaNueva) {
        let pos;
        for (let i of etiquetaNueva) {
            pos = this.etiquetas.indexOf(i);
            if (pos == -1) {
                this.etiquetas.push(i);
            }
        }
    }

    //Función de un número indeterminado de parámetros que eliminara etiqueta
    this.borrarEtiquetas = function (...eliminarEtiqueta) {
        let pos;
        for (let i of eliminarEtiqueta) {
            pos = this.etiquetas.indexOf(i);
            if ( pos != -1) {
                this.etiquetas.splice ( pos ,1);
            }
        }
    }

    //Función de un parámetro que devolverá el período de agrupación
    this.obtenerPeriodoAgrupacion = function (periodo) {
        let fecha = new Date(this.fecha);
        if ( periodo =="dia") {
            return fecha.toISOString().substring(0 , 10);
        } else if (periodo == "mes") {
            return fecha.toISOString().substring(0 , 7);
        } else if (periodo == "anyo") {
            return fecha.toISOString().substring(0, 4);
        }

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
