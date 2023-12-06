// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;
const gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if (nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        console.log("Presupuesto no válido");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = valor >= 0 ? valor : 0;
    this.fecha = Date.parse(fecha) || Date.now();
    this.etiquetas = etiquetas;

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function(descripcion) {
        this.descripcion = descripcion;
    }
    this.actualizarValor = function(valor) {
        if (valor >= 0) {
            this.valor = valor;
        }
    }
    this.mostrarGastoCompleto = function() {
        let ret = `${this.mostrarGasto()}.\n`;
        ret += `Fecha: ${(new Date(this.fecha)).toLocaleString()}\n`;
        ret += "Etiquetas:\n";
        for (const etiqueta of this.etiquetas) {
            ret += `- ${etiqueta}\n`;
        }
        return ret;
    }
    this.actualizarFecha = function(fecha) {
        if (Date.parse(fecha)) {
            this.fecha = Date.parse(fecha);
        }
    }
    this.anyadirEtiquetas = function(...etiquetas) {
        for (const etiqueta of etiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    }
    this.borrarEtiquetas = function(...etiquetas) {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetas.includes(etiqueta))
    }
    this.obtenerPeriodoAgrupacion = function(periodo) {
        let texto = "";
        let fecha = new Date(this.fecha);
        if (periodo === "anyo" || periodo === "mes" || periodo === "dia") {
            texto += fecha.getFullYear();
        }
        if (periodo === "mes" || periodo === "dia") {
            let mes = fecha.getMonth() + 1;
            if (mes < 10) {
                mes = "0" + mes;
            }
            texto += "-" + mes;
        }
        if (periodo === "dia") {
            let dia = fecha.getDate();
            if (dia < 10) {
                dia = "0" + dia;
            }
            texto += "-" + dia;
        }
        return texto;
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    gastos.push(gasto);
    idGasto++;
}

function borrarGasto(id) {
    const idxBorrar = gastos.findIndex(gasto => gasto.id === id);
    gastos.splice(idxBorrar, 1);
}

function calcularTotalGastos() {
    return gastos.reduce((suma, gasto) => suma + gasto.valor, 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(
    {
        fechaDesde,
        fechaHasta,
        valorMinimo,
        valorMaximo,
        descripcionContiene,
        etiquetasTiene
    }
) {
    if (descripcionContiene) {
        descripcionContiene = descripcionContiene.toLowerCase();
    }
    if (etiquetasTiene) {
        etiquetasTiene = etiquetasTiene.map(etiqueta => etiqueta.toLowerCase());
    }
    if (fechaDesde) {
        fechaDesde = Date.parse(fechaDesde);
    }
    if (fechaHasta) {
        fechaHasta = Date.parse(fechaHasta);
    }
    let filtrarPorFecha = gasto =>
        (!fechaDesde || gasto.fecha >= fechaDesde) &&
        (!fechaHasta || gasto.fecha <= fechaHasta)
        ;
    let filtrarPorValor = gasto =>
        (!valorMinimo || gasto.valor >= valorMinimo) &&
        (!valorMaximo || gasto.valor <= valorMaximo)
    let filtrarPorDescripcion = gasto => !descripcionContiene || gasto.descripcion.toLowerCase().includes(descripcionContiene);
    let filtrarPorEtiquetas = gasto =>
        !etiquetasTiene || etiquetasTiene.some(etiqueta => gasto.etiquetas.map(e => e.toLowerCase()).includes(etiqueta));

    return gastos.filter(gasto =>
        filtrarPorFecha(gasto) &&
        filtrarPorValor(gasto) &&
        filtrarPorDescripcion(gasto) &&
        filtrarPorEtiquetas(gasto)
    );
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
    const gastosFiltrados = filtrarGastos({fechaDesde, fechaHasta, etiquetasTiene: etiquetas});
    return gastosFiltrados.reduce((agrup, gasto) => {
        let periodoAgrup = gasto.obtenerPeriodoAgrupacion(periodo);
        if (periodoAgrup in agrup) {
            agrup[periodoAgrup] += gasto.valor;
        } else {
            agrup[periodoAgrup] = gasto.valor;
        }
        return agrup;
    }, {})
}

function transformarListadoEtiquetas(etiquetas) {
    return etiquetas.trim() && etiquetas.split(/[,\.;: ]+/g);
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
}
