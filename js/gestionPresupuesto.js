let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(cantidad) {
    if (typeof cantidad === 'number' && cantidad >= 0) {
        presupuesto = cantidad;
        return presupuesto;
    } else {
        console.log("La cantidad introducida no puede ser negativa.")
        return -1;    
    }
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, cantidad, fecha, ...etiquetas) {

    this.valor = (typeof cantidad === 'number' && cantidad >= 0) ? cantidad : 0;
    this.descripcion = descripcion;
    this.fecha = (!isNaN(Date.parse(fecha))) ? Date.parse(fecha) : Date.now();
    this.etiquetas = etiquetas;

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGastoCompleto = function() {
        let gastoCadena = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        gastoCadena += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        gastoCadena += 'Etiquetas:\n';

        for(let etiqueta of this.etiquetas) {
            gastoCadena += `- ${etiqueta}\n`;
        }

        return gastoCadena;
    }

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarFecha = function(fecha) {
        if (!isNaN(Date.parse(fecha))) {
            this.fecha = Date.parse(fecha);
        }
    }

    this.anyadirEtiquetas = function(...etiquetas) {
        let nuevasEtiquetas = etiquetas.filter(etiqueta => !this.etiquetas.includes(etiqueta));
        this.etiquetas = this.etiquetas.concat(nuevasEtiquetas);
    }

    this.borrarEtiquetas = function(...etiquetas) {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetas.includes(etiqueta));
    }

    this.obtenerPeriodoAgrupacion = function(periodo) {
        const fecha = new Date(this.fecha);
        const mes = fecha.getUTCMonth() < 9 ? `0${fecha.getUTCMonth() + 1}` : fecha.getUTCMonth() + 1;
        const dia = fecha.getUTCDate() < 10 ? `0${fecha.getUTCDate()}` : fecha.getUTCDate();
        const anyo = fecha.getUTCFullYear();

        let agrupacion = "";

        switch (periodo) {
            case "dia":
                agrupacion = `${anyo}-${mes}-${dia}`;
                break;
            case "mes":
                agrupacion = `${anyo}-${mes}`;
                break;
            case "anyo":
                agrupacion = anyo;
                break;
        }

        return agrupacion;
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
    gastos = gastos.filter(gasto => gasto.id != id);
}

function calcularTotalGastos() {
    let totalGastos = 0;
    for(let gasto of gastos) {
        totalGastos += gasto.valor;
    }
    return totalGastos;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtros) {
    let gastosFiltrados = gastos;

    for (const filtro in filtros) {
        switch (filtro) {
            case "fechaDesde":
                gastosFiltrados = gastosFiltrados.filter(gasto => new Date(gasto.fecha) >= new Date(filtros[filtro]));
                break;
            case "fechaHasta":
                gastosFiltrados = gastosFiltrados.filter(gasto => new Date(gasto.fecha) <= new Date(filtros[filtro]));
                break; 
            case "valorMinimo":
                gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor >= filtros[filtro]);
                break; 
            case "valorMaximo":
                gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor <= filtros[filtro]);
                break; 
            case "descripcionContiene":
                gastosFiltrados = gastosFiltrados.filter(gasto => gasto.descripcion.toLowerCase().includes(filtros[filtro].toLowerCase()));
                break;
            case "etiquetasTiene":
                gastosFiltrados = gastosFiltrados.filter(gasto => gasto.etiquetas.some(etiqueta => filtros[filtro].includes(etiqueta)));
                break; 
        }
    }

    return gastosFiltrados;
}

function agruparGastos() {}

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
