"use strict";

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    }
    else {
        console.log("El valor introducido no es válido");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = valor >= 0 ? valor : 0;
    this.etiquetas = etiquetas;
    this.fecha = Date.parse(fecha) || Date.now();   

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }    
    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function(nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }
    this.mostrarGastoCompleto = function() {
        let texto = this.mostrarGasto() + ".\n";
        texto += "Fecha: " + (new Date(this.fecha)).toLocaleString() + "\n";  
        texto += "Etiquetas:\n";
        for (const etiqueta of this.etiquetas) {
            texto += `- ${etiqueta}\n`;
        }
        return texto;
    }
    this.actualizarFecha = function(nuevaFecha) {
        this.fecha = Date.parse(nuevaFecha) || this.fecha;
    }
    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (const nuevaEtiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(nuevaEtiqueta)) {
                this.etiquetas.push(nuevaEtiqueta);
            }
        }
    } 
    this.borrarEtiquetas = function(...borrarEtiquetas) {        
        for (const borrarEtiqueta of borrarEtiquetas) {
            let indexBorrar = this.etiquetas.findIndex(function(etiqueta) {
                return etiqueta === borrarEtiqueta;
            })
            if (indexBorrar != -1) {
                this.etiquetas.splice(indexBorrar, 1);
            }           
        }
    }
    this.obtenerPeriodoAgrupacion = function (periodo) {
        let fecha = new Date(this.fecha);

        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();

        if (mes < 10) {
            mes = "0" + mes;
        }
        if (dia < 10) {
            dia = "0" + dia;
        }

        if (periodo === 'dia') {
            return `${anio}-${mes}-${dia}`;
        }
        if (periodo === 'mes') {
            return `${anio}-${mes}`;
        }
        if (periodo === 'anyo') {
            return `${anio}`;
        }
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let indexBorrar = gastos.findIndex(function(gasto) {
        return gasto.id === id;
    })
    if (indexBorrar != -1) {
        gastos.splice(indexBorrar, 1);
    }    
}

function calcularTotalGastos() {
    let resultado = gastos.reduce((suma, gasto) => suma + gasto.valor, 0);
    return resultado;
}

function calcularBalance() {
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}) {

    //Fechas
    fechaDesde = Date.parse(fechaDesde);
    fechaHasta = Date.parse(fechaHasta);
    let cumpleFechas = (gasto) => {
        if (fechaDesde && gasto.fecha < fechaDesde) {
          return false;  
        }
        if (fechaHasta && gasto.fecha > fechaHasta) {
            return false;
        }
        return true;
    }    

    //Valores
    let cumpleValores = (gasto) => {
        if (valorMinimo && gasto.valor < valorMinimo) {
          return false;  
        }
        if (valorMaximo && gasto.valor > valorMaximo) {
            return false;
        }
        return true;
    }  

    //Descripción    
    if (descripcionContiene) {
        descripcionContiene = descripcionContiene.toLowerCase();
    }
    let cumpleDescripcion = (gasto) => {
        if (descripcionContiene && !gasto.descripcion.toLowerCase().includes(descripcionContiene)) {
            return false;  
        }
        return true;
    }
    //Etiquetas
    if (etiquetasTiene) {
        etiquetasTiene = etiquetasTiene.map(etiqueta => etiqueta.toLowerCase());
    }       
    let cumpleEtiquetas = (gasto) => {
        if (!etiquetasTiene) {
            return true;
        }
        if (etiquetasTiene && gasto.etiquetas.find((etiqueta) => etiquetasTiene.includes(etiqueta.toLowerCase()))) {
            return true;
        }
        return false;
    }

    let gastosFiltrados = gastos.filter(gasto => (
            cumpleFechas(gasto) &&
            cumpleValores(gasto) &&
            cumpleDescripcion(gasto) &&
            cumpleEtiquetas(gasto) 
        )
    ) 
    return gastosFiltrados;
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
    let gastosFiltrados = filtrarGastos({etiquetasTiene: etiquetas, fechaDesde, fechaHasta});
   
    let gastosAgrupados = gastosFiltrados.reduce((acc, gasto) => {
        let clavePeriodo = gasto.obtenerPeriodoAgrupacion(periodo);
        acc[clavePeriodo] = clavePeriodo in acc ? acc[clavePeriodo] + gasto.valor : gasto.valor;
        return acc;
    }, {})
    return gastosAgrupados;
}

function transformarListadoEtiquetas(etiquetas) {
    return etiquetas.split(/[~,.:; ]+/);
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
    transformarListadoEtiquetas
}
