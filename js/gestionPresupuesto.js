// Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoValor) {

    if (nuevoValor >= 0) {
        presupuesto = nuevoValor;

        return presupuesto;
    } else {
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €` ;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    
    if (valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(descripcion) {
        this.descripcion = descripcion;
    };

    this.actualizarValor = function(valor) {

        if (valor >= 0) {
            this.valor = valor;
        }
    };

    this.etiquetas = [];

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {

        for (let etiq of nuevasEtiquetas) {

            if(! this.etiquetas.includes(etiq)) {
                this.etiquetas.push(etiq);
            }
        }
    };

    this.borrarEtiquetas = function(...nombreEtiquetas) {

        for (let etiq of nombreEtiquetas) {
            let posEtiqueta = this.etiquetas.indexOf(etiq);

            if (posEtiqueta >= 0) {
                this.etiquetas.splice(posEtiqueta, 1);
            }
        }
    };

    this.mostrarGastoCompleto = function() {
        let fechaFormato = new Date(this.fecha);
        let etiquetasFormato = "";

        etiquetasFormato += `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        etiquetasFormato += `Fecha: ${fechaFormato.toLocaleString()}\n`;
        etiquetasFormato += `Etiquetas:\n`;

        this.etiquetas.forEach(etiq => {
            etiquetasFormato += `- ${etiq}\n`;
        });

        return etiquetasFormato;
    };

    this.actualizarFecha = function(nuevaFecha) {

        if (! isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    };

    let nFecha = Date.parse(fecha);

    if (isNaN(nFecha)) {
        this.fecha = Date.now();
    } else {
        this.fecha = nFecha;
    }

    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }

    this.obtenerPeriodoAgrupacion = function(periodo) {
        let fechaGasto = new Date(this.fecha);
        fechaGasto = fechaGasto.toISOString();

        let periodoAgrupacion = "";

        switch (periodo) {
            case 'anyo':
                periodoAgrupacion = fechaGasto.slice(0, 4);
                break;
            case 'mes':
                periodoAgrupacion = fechaGasto.slice(0, 7);
                break;
            case 'dia':
                periodoAgrupacion = fechaGasto.slice(0, 10);
                break;
            default:
                break;
        }

        return periodoAgrupacion;
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(nuevoGasto) {
    nuevoGasto["id"] = idGasto;
    idGasto++;
    gastos.push(nuevoGasto);
}

function borrarGasto(idGasto) {
    let posGasto = gastos.findIndex(gasto => gasto.id == idGasto);

    if(posGasto >= 0) {
        gastos.splice(posGasto, 1);
    }
}

function calcularTotalGastos() {
    let totalGastos = 0;

    gastos.forEach(gasto => {
        totalGastos += gasto.valor;
    });

    return totalGastos;
}

function calcularBalance() {
    let balance =  presupuesto - calcularTotalGastos();

    return balance;
}

function filtrarGastos(filtro) {
    return gastos.filter(function(gasto) {
        let resultado = true;

        if (filtro.fechaDesde && ! isNaN(Date.parse(filtro.fechaDesde))) {
            let fechaFiltro = new Date(filtro.fechaDesde);

            if (fechaFiltro.getTime() > gasto.fecha) {
                resultado = false;
            }
        }

        if (filtro.fechaHasta && ! isNaN(Date.parse(filtro.fechaHasta))) {
            let fechaFiltro = new Date(filtro.fechaHasta);

            if (fechaFiltro.getTime() < gasto.fecha) {
                resultado = false;
            }
        }

        if (filtro.valorMinimo && filtro.valorMinimo > 0) {
            
            if (filtro.valorMinimo > gasto.valor) {
                resultado = false;
            }
        }

        if (filtro.valorMaximo && filtro.valorMaximo > 0) {
            
            if (filtro.valorMaximo  < gasto.valor) {
                resultado = false;
            }
        }

        if (filtro.descripcionContiene) {

            if (gasto.descripcion.toLowerCase().indexOf(filtro.descripcionContiene.toLowerCase()) == -1) {
                resultado = false;
            }
        }

        if (filtro.etiquetasTiene) {
            let etiqMinusc = gasto.etiquetas.map(etiq => etiq.toLowerCase());
            let filtroMinusc = filtro.etiquetasTiene.map(etiq => etiq.toLowerCase());
            
            let tieneEtiqueta = etiqMinusc.find(etiq => filtroMinusc.includes(etiq));

            if ( !tieneEtiqueta) {
                resultado = false;
            }
        }
        return resultado;
    });
}

function agruparGastos() {
    
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
