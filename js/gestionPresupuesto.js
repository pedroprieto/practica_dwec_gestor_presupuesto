"use strict";

//import { assert } from "chai";

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


function actualizarPresupuesto(nuevoValorPresupuesto) {

    if ((nuevoValorPresupuesto < 0) || (isNaN(nuevoValorPresupuesto))) {
        console.log (`El presupuesto no puede tener valor negativo.`);
        return -1;
    }
    else {
        presupuesto = nuevoValorPresupuesto;
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;    
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
    this.descripcion = descripcion;
    if (isNaN(valor) || (valor < 0)) {
        this.valor = 0;
    }
    else {
        this.valor = valor;
    }
    
    //1º inicializo this.etiquetas con un array vacío.
    //2º si la longitud del array etiquetas es mayor que 0 es que se ha introducido algún valor,
    //así que puedo asignar dichos valores a this.etiquetas, en caso contrario le asigno un array vacío.
    this.etiquetas = []; 
    this.etiquetas = (etiquetas.length > 0) ? this.etiquetas.concat(etiquetas) : [];
    
    //Si fecha no tiene valor o el string introducido no es válido, me quedo con la fecha actual
    //en caso contrario con la fecha dada
    if (isNaN(Date.parse(fecha)) || fecha == undefined) {
        this.fecha = Date.parse(Date().toString());
    }
    else {
        this.fecha = Date.parse(fecha);
    }

    this.mostrarGasto = function() {
        console.log (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }

    this.actualizarDescripcion = function (descripcion) {
        this.descripcion = descripcion; 
    }

    this.actualizarValor = function (nuevoValor) {
        if (isNaN(nuevoValor) || (nuevoValor < 0)) {
            //this.valor = 0;
        }
        else if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    } 
    
    this.mostrarGastoCompleto = function () {

        let fechaMostrar = new Date(this.fecha);
        let etiquetasMostrar ="";

        for (let itemEtiqueta of this.etiquetas) {
            etiquetasMostrar += `\n- ${itemEtiqueta}`
        }

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaMostrar.toLocaleString()}\nEtiquetas:${etiquetasMostrar}\n`;
    }
    
    this.actualizarFecha = function (fechaActualizar) {
        //Si fecha no tiene valor o el string introducido no es válido, me quedo con la fecha actual
        //por lo que no hago nada, en caso contrario con la fecha dada.
        if (!(isNaN(Date.parse(fechaActualizar)) || fechaActualizar == undefined)) {
            this.fecha = Date.parse(fechaActualizar);
        }
    }

    this.anyadirEtiquetas = function (...etiquetasAnyadir) {
        //Si no hay etiquetas no añado nada. En caso de haber alguna compruebo si ya existe y en caso de existir dicha etiqueta, no hago nada. Para ver si existen o no uso 'includes'.
        //Hasta terminar de revisar todas y añadirlas o no según se vea si existen o no. Las añado al fiunal del array con 'push'.
        if (etiquetasAnyadir.length > 0) {
            for (let itemEtiquetaAnyadir of etiquetasAnyadir) {
                if (!(this.etiquetas.includes(itemEtiquetaAnyadir))) {
                    //Si la etiqueta no está previamente creada, la añado.
                    this.etiquetas.push (itemEtiquetaAnyadir);
                }
            }
        }
    }

    this.borrarEtiquetas = function (...etiquetasBorrar) {
        //Si no hay etiquetas no hago nada. En caso contrario busco el índice de la etiqueta con 'indexOf' y las voy eliminado.
        if (etiquetasBorrar.length > 0) {
            for (let itemEtiquetaBorrar of etiquetasBorrar) {
                if (this.etiquetas.indexOf(itemEtiquetaBorrar) > -1) {
                    this.etiquetas.splice(this.etiquetas.indexOf(itemEtiquetaBorrar),1);
                }
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function (periodoAgrupar) {
        if (["anyo", "mes", "dia"].includes (periodoAgrupar)) {
            let partesFecha = fecha.toString().split("-");
            if (periodoAgrupar == "anyo") {
              return partesFecha[0];
            } else if (periodoAgrupar == "mes") {
              return partesFecha[0] + "-" + partesFecha[1];
            } else {
              return partesFecha[0] + "-" + partesFecha[1] + "-" + partesFecha[2];
            }
        }
    }

}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gastoAnyadir) {
    //Añado a id el idGasto actual
    gastoAnyadir.id = idGasto;
    //Incremento idGasto en  una unidad
    idGasto++;
    //Añado gastoAnyadir al array gastos
    gastos.push(gastoAnyadir);
}

function borrarGasto(idGastoBorrar) {
    
    //Busco la posición del elemento buscado por su 'id' con findIndex, y lo borro usando 'splice'
    let indice = gastos.findIndex((item) => item.id == idGastoBorrar);
    gastos.splice (indice,1);    
}

function calcularTotalGastos() {

    //Puedo hacerlo de este modo, con un bucle
    /*
        let acumulado = 0;
        for (let item of gastos) {
            acumulado += item.valor;
        }
        return acumulado;
    */

    //También puede hacerse usando map  y reduce.
    /*let valores = gastos.map (gastoUsar => gastoUsar.valor);

    return valores.reduce ((valorInicial, valorElemento) => valorInicial + valorElemento, 0);*/

    return gastos.map (gastoUsar => gastoUsar.valor).reduce ((valorInicial, valorElemento) => valorInicial + parseFloat(valorElemento), 0);

}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(objetoUsar) {
    
    let gastosFiltrados = gastos.filter(gasto => gasto);

    if (Object.keys(objetoUsar).length === 0){
        return gastosFiltrados;
    }
    else {
        if (objetoUsar.fechaDesde) {
            gastosFiltrados = gastosFiltrados.filter(gasto => gasto.fecha >= (Date.parse(objetoUsar.fechaDesde)));
        }

        if (objetoUsar.fechaHasta) {
            gastosFiltrados = gastosFiltrados.filter(gasto => gasto.fecha <= (Date.parse(objetoUsar.fechaHasta))); 
        }

        if (objetoUsar.valorMinimo) {
            gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor >= objetoUsar.valorMinimo);
        }

        if (objetoUsar.valorMaximo) {
            gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor <= objetoUsar.valorMaximo);
        }

        if (objetoUsar.descripcionContiene) {
            gastosFiltrados = gastosFiltrados.filter(gasto => gasto.descripcion.indexOf(objetoUsar.descripcionContiene) > -1);
        }

        if (objetoUsar.etiquetasTiene) {
            gastosFiltrados = gastosFiltrados.filter(gasto => {
                if (gasto.etiquetas && Array.isArray(gasto.etiquetas)){ //Me aseguro de que etiquetas sea un array y exista
                    for (let item of objetoUsar.etiquetasTiene) {       //Recorro las etiquetas del objetoUsar
                        if (gasto.etiquetas.includes(item)) {           //y con item voy comprobando si están incluidas en las etiquetas de gasto 
                            return true;                                //En cuanto detecta una devuelve true
                        }
                    }
                }
                return false;   //Si no detecta ninguna devuelve false
            });

        }

        //Buscando por internet he visto esta otra forma de hacerlo pero no la entiendo bien
        //por eso la tengo comentada.

        /*if (objetoUsar.etiquetasTiene) {
            gastosFiltrados = gastosFiltrados.filter(gasto =>
                objetoUsar.etiquetasTiene.some(item => Array.isArray(gasto.etiquetas) && gasto.etiquetas.includes(item))
            );
        }*/

        return gastosFiltrados;
    }
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    //Llamo a filtrarGastos
    let gastosFiltrados = filtrarGastos ({etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta});

    //Monto la función 'reduce'
    return gastosFiltrados.reduce (function (acumulado, gasto) {
        let periodoGasto = gasto.obtenerPeriodoAgrupacion (periodo); //Obtengo el periodo de agrupación dentro de la variable 'periodoGasto'

        //Si existe 'acumulado[periodoGasto]' le acumulo el valor del gasto (valor 1 del operador ternario ?)
        //Si no existe 'acumulado[periodoGasto]' le asigno el valor del gasto correspondiente (valor 2 del operador ternario ?)
        acumulado[periodoGasto] = (acumulado[periodoGasto]) ?  acumulado[periodoGasto] += gasto.valor: acumulado[periodoGasto] = gasto.valor;
        return acumulado; //Finalmente devuelvo el acumulado

        //Primero hice las condiciones con if, pero he podido ver la forma de hacerlo con el operador ternario ? y queda todo claro en una línea.
        /*if (acumulado[periodoGasto]) {
            acumulado[periodoGasto] += gasto.valor; //Si existe 'acumulado[periodoGasto]' le acumulo el valor del gasto
        }
        else {
            acumulado[periodoGasto] = gasto.valor; //Si no existe 'acumulado[periodoGasto]' le asigno el valor del gasto correspondiente
        }*/
        

    }, {}); //Como valor inicial pongo un objeto vacío '{}'
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