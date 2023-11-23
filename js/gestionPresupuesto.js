// Adrián Romero Alonso 2DAWY 53978049Q
"use strict";
let presupuesto = 0;                                                                                                 //Declaración de variables globales ARA
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {                                                                             //Función que acutaliza la variable global presupuesto ARA
    let valorDevuelto = 0;
    if (valor < 0 || isNaN(valor)) {
        console.log("El valor introducido es negativo e incorrecto.");
        valorDevuelto = -1;
    }
    else {
        presupuesto = valor;
        valorDevuelto = valor;
    }
    return valorDevuelto;
}

function mostrarPresupuesto() {                                                                                     //Función que devuelve un mensaje y la variable global presupuesto ARA  
    console.log(`Tu presupuesto actual es de ${presupuesto} €`);
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcionEntrante, valorEntrante = 0, fechaEntrante = Date.now(), ...etiquetasEntrante) {     //Función contructor del objeto Gasto ARA
    if (valorEntrante < 0 || isNaN(valorEntrante)) {
        valorEntrante = 0;
    }
    if (typeof fechaEntrante === "string") {                                                                        //Zona de asignación de parametros ARA
        if (isNaN(Date.parse(fechaEntrante))) {
            fechaEntrante = Date.now();
        }
        else {
            fechaEntrante = Date.parse(fechaEntrante);
        }
    }
    
    this.descripcion = descripcionEntrante,
    this.valor = parseFloat(valorEntrante),
    this.etiquetas =  [...etiquetasEntrante],
    this.fecha = fechaEntrante,
    
    this.mostrarGasto = function () {                                                                             // Metodo que devuelve un texto con la descripción y valor del objeto gasto ARA
        console.log(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    },

    this.mostrarGastoCompleto = function () {                                                                       //Metodo que devuelvela información detallada del objeto gasto ARA 
        let cadenaCompleta = "";
        let cadenaFecha = new Date(this.fecha).toLocaleString();
        cadenaCompleta += `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${cadenaFecha}\nEtiquetas:\n`;
        for (let i = 0; i < this.etiquetas.length; i++) {
            cadenaCompleta += `- ${this.etiquetas[i]}\n`
        }
        console.log(cadenaCompleta);
        return cadenaCompleta;
    },

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {                                                                //Metodo para añadir etiquetas ARA 
        for (let i = 0; i < nuevasEtiquetas.length; i++) {
            if(this.etiquetas.includes(nuevasEtiquetas[i])) {
                continue;
            }
            this.etiquetas.push(nuevasEtiquetas[i]);
        }
    },

    this.borrarEtiquetas = function (...etiquetasABorrar) {                                                                 //Metodo para borrar etiquetas ARA 
        for (let i = 0; i < etiquetasABorrar.length; i++) {
            for (let f = 0; f < this.etiquetas.length; f++) {
                if (etiquetasABorrar[i] === this.etiquetas[f]){
                    this.etiquetas.splice(f, 1);
                }
            }
        }
    },

    this.actualizarDescripcion = function(nuevaDescripcion) {                                                               //Metodos para actualizar valores ARA
        this.descripcion = nuevaDescripcion;
    },

    this.actualizarValor = function (nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    },
    
    this.actualizarFecha = function (nuevaFecha) {
        if (!isNaN(Date.parse(nuevaFecha)))
        {
            this.fecha = Date.parse(nuevaFecha);
        }
    },

    this.obtenerPeriodoAgrupacion = function(periodo) {                                                                                 //Metodo que obtiene el periodo de educacion ARA
        let fechaGasto = new Date(this.fecha);

        switch(periodo) {
            case "dia":
                return `${
                    fechaGasto.getFullYear()}-${
                        ((fechaGasto.getMonth() + 1) < 10) ? `0${fechaGasto.getMonth() + 1}` : `${fechaGasto.getMonth() + 1}`}-${
                            (fechaGasto.getDate() < 10) ? `0${fechaGasto.getDate()}` : `${fechaGasto.getDate()}`}`;
            case "mes":
                return `${
                    fechaGasto.getFullYear()}-${
                        ((fechaGasto.getMonth() + 1) < 10) ? `0${fechaGasto.getMonth() + 1}` : `${fechaGasto.getMonth() + 1}`}`
            case "anyo":
                return `${
                    fechaGasto.getFullYear()}`
            default:
                return "Periodo incorrecto";
        };
    }
} 

function listarGastos() {                                                                                                             //Funcion getter de gastos ARA
    return gastos;
}

function anyadirGasto(gasto) {                                                                                                      //Función para añadir gastos ARA
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(idEntrante) {                                                                                                  //Función para borrar gastos ARA
    for(let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === idEntrante) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {                                                                                                   //Funcion para calcular los gastos totales ARA
    let acumulado = 0;

    for (let i = 0; i < gastos.length; i++) {
        acumulado += gastos[i].valor;
    }
    return acumulado;
}

function calcularBalance() {                                                                                                //Funcion que devuelve el balance de gastos ARA
    return (presupuesto - calcularTotalGastos())
}

function filtrarGastos(filtroEntrante) {    
    let fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene;                              //Zona de Creación de variables ARA
    let tieneEtiquetas = false;
    let caseString = ""; 

    if (filtroEntrante.hasOwnProperty("fechaDesde")) {                                                                      //Zona de comprobación y asignacion de las propiedades del objeto entrante ARA
        if (!isNaN(Date.parse(filtroEntrante.fechaDesde))) {
            fechaDesde = Date.parse(filtroEntrante.fechaDesde);
            caseString += "a";
        }
    }
    if (filtroEntrante.hasOwnProperty("fechaHasta")) {
        if (!isNaN(Date.parse(filtroEntrante.fechaHasta))) {
            fechaHasta = Date.parse(filtroEntrante.fechaHasta);
            caseString += "b";
        }
    }
    if (filtroEntrante.hasOwnProperty("valorMinimo")) {
        valorMinimo = filtroEntrante.valorMinimo;
        caseString += "c";
    }
    if (filtroEntrante.hasOwnProperty("valorMaximo")) {
        valorMaximo = filtroEntrante.valorMaximo;
        caseString += "d";
    }
    if (filtroEntrante.hasOwnProperty("descripcionContiene")) {
        descripcionContiene = filtroEntrante.descripcionContiene;
        caseString += "e";
    }
    if (filtroEntrante.hasOwnProperty("etiquetasTiene")) {
        etiquetasTiene = filtroEntrante.etiquetasTiene;
        tieneEtiquetas = true;
    }

        let arrayDevolver = gastos.filter((gasto) => {                                                                       //Filtro del array de gastos ARA
        
        let boolSwitch = false;                                                                                             //Zona de declaracion de booleanos ARA
        let boolEtiquetas = false;
        let tienePropiedades = (caseString === "") ? false : true; 
        let boolFilter = false;

        if (tieneEtiquetas) {                                                                                               //Zona de comprobación de etiquetas ARA
            etiquetasTiene.forEach((etiqueta) => {
                if (gasto.etiquetas.includes(etiqueta)) {
                    boolEtiquetas = true;
                }
            });
        }
        
        switch(caseString) {                                                                                               //Comprobacion de propiedades ARA
            case "abcde":
                if (fechaDesde <= gasto.fecha && fechaHasta >= gasto.fecha) {
                    if(valorMaximo >= gasto.valor && valorMinimo <= gasto.valor) {
                        if(gasto.descripcion.includes(descripcionContiene)) {
                            boolSwitch = true;
                        }
                    }
                }
                break;
            case "abcd":
                if (fechaDesde <= gasto.fecha && fechaHasta >= gasto.fecha) {
                    if(valorMaximo >= gasto.valor && valorMinimo <= gasto.valor) {
                        boolSwitch = true;
                    }
                }
                break;
            case "abce":
                if (fechaDesde <= gasto.fecha && fechaHasta >= gasto.fecha) {
                    if (valorMinimo <= gasto.valor) {
                        if (gasto.descripcion.includes(descripcionContiene)) {
                            boolSwitch = true;
                        }
                    }
                }
                break;
            case "abc":
                if (fechaDesde <= gasto.fecha && fechaHasta >= gasto.fecha) {
                    if(valorMinimo <= gasto.valor) {
                        boolSwitch = true;
                    }
                }
                break;
            case "abd":
                if (fechaDesde <= gasto.fecha && fechaHasta >= gasto.fecha) {
                    if (valorMaximo >= gasto.valor) {
                        boolSwitch = true;
                    }
                }
                break;
            case "abe":
                if (fechaDesde <= gasto.fecha && fechaHasta >= gasto.fecha) {
                    if (gasto.descripcion.includes(descripcionContiene)) {
                        boolSwitch = true;
                    }
                }
                break;
            case "ab":
                if (fechaDesde <= gasto.fecha && fechaHasta >= gasto.fecha) {
                    boolSwitch = true;
                }
                break;
            case "ac":
                if (fechaDesde <= gasto.fecha) {
                    if (valorMinimo <= gasto.valor) {
                        boolSwitch = true;
                    }
                }
                break;
            case "ad":
                if (fechaDesde <= gasto.fecha) {
                    if (valorMaximo >= gasto.valor) {
                        boolSwitch = true;
                    }
                }
                break;
            case "ae":
                if (fechaDesde <= gasto.fecha) {
                    if (gasto.descripcion.includes(descripcionContiene)) {
                        boolSwitch = true;
                    }
                }
                break;
            case "bcde":
                if (fechaHasta >= gasto.fecha) {
                    if (valorMaximo >= gasto.valor && valorMinimo <= gasto.valor) {
                        if (gasto.descripcion.includes(descripcionContiene)) {
                            boolSwitch = true;
                        }
                    }
                }
                break;
            case "bcd":
                if (fechaHasta >= gasto.fecha) {
                    if (valorMaximo >= gasto.valor && valorMinimo <= gasto.valor) {
                        boolSwitch = true;
                    }
                }
                break;
            case "bce":
                if (fechaHasta >= gasto.fecha) {
                    if (valorMinimo <= gasto.valor) {
                        if (gasto.descripcion.includes(descripcionContiene)) {
                            boolSwitch = true;
                        }
                    }
                }
                break;
            case "bc":
                if (fechaHasta >= gasto.fecha) {
                    if (valorMinimo <= gasto.valor) {
                        boolSwitch = true;
                    }
                }
                break;
            case "bd":
                if (fechaHasta >= gasto.fecha) {
                    if (valorMaximo >= gasto.valor) {
                        boolSwitch = true;
                    }
                }
                break;
            case "be":
                if (fechaHasta >= gasto.fecha) {
                    if (gasto.descripcion.includes(descripcionContiene)) {
                        boolSwitch = true;
                    }
                }
                break;
            case "cde":
                if (valorMinimo <= gasto.valor && valorMaximo >= gasto.valor) {
                    if (gasto.descripcion.includes(descripcionContiene)) {
                        boolSwitch = true;
                    }    
                }
                break;
            case "cd":
                if (valorMinimo <= gasto.valor && valorMaximo >= gasto.valor) {
                    boolSwitch = true;
                }
                break;
            case "ce":
                if (valorMinimo <= gasto.valor) {
                    if (gasto.descripcion.includes(descripcionContiene)) {
                        boolSwitch = true;
                    }    
                }
                break;
            case "de":
                if (valorMaximo >= gasto.valor) {
                    if (gasto.descripcion. includes(descripcionContiene)) {
                        boolSwitch = true;
                    }
                }
                break;
            case "a":
                if (fechaDesde <= gasto.fecha) {
                    boolSwitch = true;
                }
                break;
            case "b": 
                if (fechaHasta >= gasto.fecha) {
                    boolSwitch = true;
                }
                break;
            case "c":
                if (valorMinimo <= gasto.valor) {
                    boolSwitch = true;
                }
                break;
            case "d":
                if (valorMaximo >= gasto.valor) {
                    boolSwitch = true;
                }
                break;
            case "e":
                if (gasto.descripcion.includes(descripcionContiene)) {
                    boolSwitch = true;
                }
                break;
        }
        
        if (tieneEtiquetas && tienePropiedades) {                                           //Asignacion del booleano dependiendo de si se han introducido etiquetas o propiedades ARA
            if (boolEtiquetas && boolSwitch)
                boolFilter = true;
            else
                boolFilter = false;
        }
        else if (tieneEtiquetas && !tienePropiedades) {
            if (boolEtiquetas)
                boolFilter = true;
            else
                boolFilter = false;
        }
        else if (!tieneEtiquetas && tienePropiedades) {
            if (boolSwitch)
                boolFilter = true;
            else
                boolFilter = false;
        }

        return boolFilter;
    })
   
    if (arrayDevolver.length === 0) {                                                       //Si se introduce un objeto vacio se devuelve el array con todos los gastos ARA
        arrayDevolver = [...gastos];
    }

    return arrayDevolver;
}

function agruparGastos(periodo = "mes", etiquetasEntrante = [], fechaDesdeEntrante = "", fechaHastaEntrante = Date.now()) {   //Función para agrupar los gastos ARA
    let gasto = {
        etiquetasTiene: etiquetasEntrante,
        fechaDesde: fechaDesdeEntrante,
        fechaHasta: fechaHastaEntrante
    }

    let gastosFiltrados = filtrarGastos(gasto);

    let gastosAgrupados = gastosFiltrados.reduce((acumulado, gasto) => {
        let periodoString = gasto.obtenerPeriodoAgrupacion(periodo);
        if (acumulado[periodoString] == null) {
            acumulado[periodoString] = gasto.valor;
        }
        else {
            acumulado[periodoString] += gasto.valor;
        }
        return acumulado;
    }, {});

    return gastosAgrupados;

}

// NO MODIFICAR A PARTIR DE AQUÍ:exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado.
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
