
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


function actualizarPresupuesto(valor) {
    if(valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.log("El valor no es válido. No se ha podido actualizar el presupuesto");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = (isNaN(valor) || valor < 0) ? 0 : valor;

    let fechaAux = fecha || new Date().toString();
    this.etiquetas = etiquetas || [];

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(newDesc) {
        this.descripcion = newDesc;
    };

    this.actualizarValor = function(newValue) {
        if (newValue > 0){
            this.valor = newValue;
        }
    };

    this.mostrarGastoCompleto = function(){
        let etiquetasStr = "";
        for (let etiqueta of this.etiquetas) {
            etiquetasStr += "\n- "+etiqueta;
        }
        let fechaLocale = new Date(this.fecha).toLocaleString();

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${fechaLocale}
Etiquetas:${etiquetasStr}
`;
    };

    this.actualizarFecha = function(fechaStr) {
        let fechaTimestamp = Date.parse(fechaStr);
        if (!isNaN(fechaTimestamp)){
            this.fecha = fechaTimestamp;
        }
    };

    this.actualizarFecha(fechaAux);

    this.anyadirEtiquetas = function(...newEtiquetas) {
        for(let newEtiqueta of newEtiquetas) {
            if(!this.etiquetas.find(e => e == newEtiqueta)) {
                this.etiquetas.push(newEtiqueta);
            }
        }
    };

    this.borrarEtiquetas = function(...etiquetasToDelete) {
        for(let etiqueta of etiquetasToDelete) {
            let index = this.etiquetas.findIndex(e => e == etiqueta);
            if(index > -1) {
                this.etiquetas.splice(index, 1);
            }
        }
    };

    this.obtenerPeriodoAgrupacion = function(periodo) {
        let fechaFormateada = "";
        let date = new Date(this.fecha);
        let month = date.getMonth() + 1;
        let monthStr = (month > 9) ? month.toString() : "0"+ month;

        switch (periodo){
            case 'dia':
                let day = date.getDate();
                let dayStr = (day > 9) ? day.toString() : "0"+ day;
                fechaFormateada = date.getFullYear() + "-" + monthStr + "-" + dayStr;
                break;
            case 'mes':
                fechaFormateada = date.getFullYear() + "-" + monthStr;
                break;
            case 'anyo':
                fechaFormateada = date.getFullYear();
                break;
            default:
                break;
        }
        return fechaFormateada;
    };
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(idBorrar) {
    let index = gastos.findIndex(g => g.id == idBorrar);
    if(index > -1) {
        gastos.splice(index, 1);
    }
}


function calcularTotalGastos() {
    let total = 0;
    for (let gasto of gastos) {
        total += gasto.valor;
    }
    return total;
}

function calcularBalance() {
    let gastoTotal = calcularTotalGastos();
    return presupuesto - gastoTotal;
}

function filtrarGastos(filtro){
    if(Object.keys(filtro).length === 0) {
        return gastos;
    }

    let gastosFiltrados = gastos.filter(function(item, index, array){
        let itemMatches = false;

        for(let prop in filtro){
            switch(prop){
                case 'fechaDesde':
                    let fechaDesdeFiltro = Date.parse(filtro.fechaDesde);
                    itemMatches = item.fecha >= fechaDesdeFiltro;
                    break;
                case 'fechaHasta':
                    let fechaHastaFiltro = Date.parse(filtro.fechaHasta);
                    itemMatches = item.fecha <= fechaHastaFiltro;
                    break;
                case 'valorMinimo':
                    let valorMinimoFiltro = filtro.valorMinimo;
                    itemMatches = item.valor >= valorMinimoFiltro;
                    break;
                case 'valorMaximo':
                    let valorMaximoFiltro = filtro.valorMaximo;
                    itemMatches = item.valor <= valorMaximoFiltro;
                    break;
                case 'descripcionContiene':
                    let descripcionContieneFiltro = filtro.descripcionContiene;
                    itemMatches = item.descripcion.includes(descripcionContieneFiltro);
                    break;
                case 'etiquetasTiene':
                    let etiquetasTiene = filtro.etiquetasTiene;
                    if(etiquetasTiene.length > 0) {
                        let tieneAlgunaEtiqueta = false;
                        for (let etiqueta  of etiquetasTiene) {
                            let indexEtiqueta = item.etiquetas.findIndex(e => e == etiqueta);
                            if(indexEtiqueta > -1) {
                                tieneAlgunaEtiqueta = true;
                                break;
                            } 
                        }
                        itemMatches = tieneAlgunaEtiqueta;
                    } else {
                        itemMatches = true;
                    }
                    break;
                default:
                    break;
            }
            if(!itemMatches){
                break;
            }
        }
        return itemMatches;
    });
    return gastosFiltrados;
}

function agruparGastos(periodo = 'mes', etiquetas = [], fechaDesde, fechaHasta){
    let filtro = {};
    if(etiquetas.length > 0) {
        filtro.etiquetasTiene = etiquetas;
    }
    if (fechaDesde) {
        filtro.fechaDesde = fechaDesde;
    }
    if (fechaHasta) {
        filtro.fechaHasta = fechaHasta;
    }

    //let gastosFiltrados = filtrarGastos({"fechaDesde": fechaDesde, "fechaHasta": fechaHasta, etiquetasTiene: etiquetas});
    let gastosFiltrados = filtrarGastos(filtro);
    let gastosAgrupados = gastosFiltrados.reduce(function(accumulator, item, index, array){    
        let periodoAgrupacion = item.obtenerPeriodoAgrupacion(periodo);
        let valorActualGrupo = accumulator[periodoAgrupacion] || 0;
        accumulator[periodoAgrupacion] = valorActualGrupo + item.valor;
        return accumulator;
    }, {});

    return gastosAgrupados;
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
