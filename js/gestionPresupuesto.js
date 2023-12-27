// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


//Funciones
function transformarListadoEtiquetas(etiquetasString) {
    return etiquetasString.split(/\W+/);
}
function actualizarPresupuesto(num) {
    if (typeof(num) === 'number' && num >= 0) {
        presupuesto = num;
        return presupuesto;
    }
    else {
        console.log("Se ha producido un error: el presupuesto debe ser el número que no sea negativo");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function listarGastos() {
    return gastos;
}
function anyadirGasto(gasto) {
    gasto.id = idGasto++;
    gastos.push(gasto);
}
function borrarGasto(id) {
    //* Busca el índice del gasto con el id proporcionado
    let indice = gastos.findIndex(gasto => gasto.id === id);
    //^ Si se encuentra el gasto, elimínalo
    if (indice != -1) {
        gastos.splice(indice, 1);
    }
}
function calcularTotalGastos() {
    let suma = 0;
    for (let g of gastos) {
        suma += g.valor;
    }
    suma = Math.round(suma * 100) / 100;
    return suma;
}
function mostrargastosTotales() {
    return `Tus gastos totales son ` + calcularTotalGastos() + `€`;
}
function calcularBalance() {
    let balance = presupuesto - calcularTotalGastos();
    balance = Math.round(balance * 100) / 100;
    return balance;
}
function mostrarBalance() {
    return `Tu balance actual es de ` + calcularBalance() + `€`;
}
function filtrarGastos(filtros) {
    return gastos.filter(function(gasto) {
        var fDesde = Date.parse(filtros.fechaDesde);
        var fHasta = Date.parse(filtros.fechaHasta);
        var dDescripcion = gasto.descripcion.toLowerCase(); //*Descripción del gasto en minusculas
        var etiquetasMinusculas = gasto.etiquetas.map(etiqueta => etiqueta.toLowerCase());
        //*Un array, que es una copia del array gasto.etiquetas, pero en minusculas
        if (
            (fDesde && gasto.fecha < fDesde) || 
            (fHasta && gasto.fecha > fHasta)
            ) {
                return false;
            }
        if (
            (filtros.valorMinimo && gasto.valor < filtros.valorMinimo) ||
            (filtros.valorMaximo && gasto.valor > filtros.valorMaximo)
            ) {
                return false;
            }
        if (filtros.descripcionContiene && !dDescripcion.includes(filtros.descripcionContiene.toLowerCase())) {
                return false;
        }
        if (filtros.etiquetasTiene) {
            let contieneEtiqueta = false;
            for (let e of filtros.etiquetasTiene) {
                if (etiquetasMinusculas.includes(e.toLowerCase())) {
                    contieneEtiqueta = true;
                }
            }
            if (!contieneEtiqueta) {
                return false;
            }
        }
        return true;
    })
}
function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta ) {
 let gastosFiltrados = filtrarGastos({etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta});
 return gastosFiltrados.reduce(function(acumulador, gasto){
    let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);
    acumulador[periodoAgrupacion] = (acumulador[periodoAgrupacion] || 0) + gasto.valor;
    return acumulador;
 }, {})
}
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    //propiedades
    this.descripcion = descripcion;
    this.valor = typeof(valor)==='number' && valor >= 0 ? valor : 0;
    this.etiquetas = Array.isArray(etiquetas) ? etiquetas : [];
    this.fecha = !isNaN(Date.parse(fecha)) ? Date.parse(fecha) : new Date().getTime();

    //métodos
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function (texto) {
        this.descripcion = texto;
    }
    this.actualizarValor = function (valor) {
        typeof(valor)==='number' && valor >= 0 ? this.valor = valor : null;
    }
    this.mostrarGastoCompleto = function () {
        let fechaLocale = new Date(parseInt(this.fecha)); //^Creamos una variable de tipo "Date", que corresponde a la this.fecha de formato "String"
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += "Fecha: " + fechaLocale.toLocaleString() + "\n";
        texto += "Etiquetas:\n";
        for (let e of this.etiquetas) {
            texto += `- ${e}\n`;
        }
        return texto;
    }
    this.actualizarFecha = function (fechaN) {
        let fechaValida = Date.parse(fechaN);
        if (!isNaN(fechaValida)) {
            this.fecha = fechaValida;
        }
    }
    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        for (let e of nuevasEtiquetas) {
            if (!this.etiquetas.includes(e)) {
                this.etiquetas.push(e);
            }
        }
    }
    this.borrarEtiquetas = function (...etiquetasBorradas) {
        //*this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasBorradas.includes(etiqueta));
        let etiquetasArray = [];
        for (let e of this.etiquetas) {
            if (!etiquetasBorradas.includes(e)) {
                etiquetasArray.push(e);
            }
        }
        this.etiquetas = etiquetasArray;
    }
    this.obtenerPeriodoAgrupacion = function (periodo) {
        let fechaGasto = new Date(this.fecha);
        switch(periodo) {
            case "dia":
                return fechaGasto.toISOString().slice(0, 10);
            case "mes":
                return fechaGasto.toISOString().slice(0, 7);
            case "anyo":
                return fechaGasto.toISOString().slice(0, 4);
            default:
                return fechaGasto.toISOString().slice(0, 7);
        }
        return resultado;
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
    agruparGastos,
    mostrargastosTotales,
    mostrarBalance,
    transformarListadoEtiquetas
}
