// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (!isNaN(valor) && valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    }
    else {
        console.error('Error');
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = 0;
    this.fecha = new Date();
    this.etiquetas = [...etiquetas];

    if (!isNaN(valor) && valor >= 0) {
        this.valor = valor;
    }

    if (!isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
    }

    this.actualizarDescripcion = function (descripcion) {
        this.descripcion = descripcion;
    }

    this.actualizarValor = function (valor) {
        if (!isNaN(valor) && valor >= 0) {
            this.valor = valor;
        }
    }

    this.mostrarGastoCompleto = function () {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${new Date(this.fecha).toLocaleString()}\nEtiquetas:\n`;
        for (let i = 0; i < this.etiquetas.length; i++) {
            texto += '- ' + etiquetas[i] + '\n';
        }
        return texto;
    }

    this.actualizarFecha = function (fecha) {
        if (!isNaN(Date.parse(fecha))) {
            this.fecha = Date.parse(fecha);
        }
    }

    this.anyadirEtiquetas = function (...etiquetas) {
        for (let etiqueta of etiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.borrarEtiquetas = function (...etiqueta) {
        this.etiquetas = this.etiquetas.filter(etiquetas => !etiqueta.includes(etiquetas));
    }

    this.obtenerPeriodoAgrupacion = function (periodo) {

        let dia = new Date(this.fecha).getDate();
        let mes = new Date(this.fecha).getMonth() + 1;
        let anyo = new Date(this.fecha).getFullYear();

        switch (periodo) {
            case 'anyo':
                return anyo;
                break;
            case 'mes':
                if (mes < 10) {
                    return `${anyo}-0${mes}`
                }
                else {
                    return `${anyo}-${mes}`
                }
                break;
            case 'dia':
                if (mes < 10 && dia < 10) {
                    return `${anyo}-0${mes}-0${dia}`
                }
                else if (mes < 10) {
                    return `${anyo}-0${mes}-${dia}`
                }
                else if (dia < 10) {
                    return `${anyo}-${mes}-0${dia}`
                }
                else {
                    return `${anyo}-${mes}-${dia}`
                }
                break;
            default:
                return 'Periodo erroneo.'
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
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let res = 0;
    for (let i = 0; i < gastos.length; i++) {
        res += gastos[i].valor;
    }
    return res;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(objeto) {
    return gastos.filter(gasto => {
        let fechaGasto = new Date(gasto.fecha);
        let fechaDesde = objeto.fechaDesde ? new Date(objeto.fechaDesde) : null;
        let fechaHasta = objeto.fechaHasta ? new Date(objeto.fechaHasta) : null;

        if ((fechaDesde && fechaGasto < fechaDesde)||(fechaHasta && fechaGasto > fechaHasta)) {
            return false;
        }

        if ((objeto.valorMinimo && gasto.valor < objeto.valorMinimo)||
            (objeto.valorMaximo && gasto.valor > objeto.valorMaximo)) {
            return false;
        }

        if (objeto.descripcionContiene &&
            !gasto.descripcion.toLowerCase().includes(objeto.descripcionContiene.toLowerCase())) {
            return false;
        }

        if (objeto.etiquetasTiene &&
            !objeto.etiquetasTiene.some(etiqueta => gasto.etiquetas.map(et => et.toLowerCase()).includes(etiqueta.toLowerCase()))) {
            return false;
        }

        return true;
    });
}

function agruparGastos() {

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
    agruparGastos
}