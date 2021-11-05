// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
'use strict'
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// TODO: Variable global


function actualizarPresupuesto(cantidad) {
    if (CompruebaCantidad(cantidad) <= 0) {
        console.log('No se pueden introducir números negativos');
        return -1;
    } else {
        presupuesto = cantidad;
        console.log(cantidad)
        return presupuesto;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CompruebaCantidad(cantidad) {
    if (cantidad < 0 || isNaN(cantidad)) {
        return -1;
    }
    else {
        return cantidad;
    }
}
function CrearGasto(descripcion, valorGasto, fecha = new Date(), ...etiquetas) {

    this.descripcion = descripcion;
    this.etiquetas = (etiquetas.length === 0) ? etiquetas = [] : etiquetas;

    this.fecha = Date.parse(fecha);

    if (CompruebaCantidad(valorGasto) > -1) {
        this.valor = valorGasto;
    } else {
        this.valor = 0;
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function (nuevoValor) {
        if (CompruebaCantidad(nuevoValor) > -1) {
            this.valor = nuevoValor;
        }
    }

    this.actualizarFecha = function (fecha) {
        var fechaParseada = Date.parse(fecha);
        if (isNaN(fechaParseada)) {
            this.fecha = this.fecha;
        } else {
            this.fecha = fechaParseada;
        }
    }

    this.mostrarGastoCompleto = function () {
        let fechaLocalizada = new Date(this.fecha).toLocaleString();
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocalizada}\nEtiquetas:\n- ${this.etiquetas.join('\n- ')}\n`
        return texto;
    }



    this.anyadirEtiquetas = function (...etiquetasAnyadir) {
        for (let i = 0; i < etiquetasAnyadir.length; i++) {
            let etiqueta = etiquetasAnyadir[i];
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.borrarEtiquetas = function (...etiquetasBorrar) {
        for (let i = 0; i < etiquetasBorrar.length; i++) {
            let etiqueta = etiquetasBorrar[i];
            let indiceElemento = this.etiquetas.indexOf(etiqueta);
            if (indiceElemento !== -1) {
                this.etiquetas.splice(indiceElemento, 1);
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function (agrupacion) {
        let fecha = new Date(this.fecha);
        let resultado = "";
        let mes,dia,anyo = "";
        let mes2;
        // debugger;
        switch (agrupacion) {
            case "mes":
                mes2=fecha.getMonth() + 1; 
                mes = mes2.toString().padStart(2, "0");
                anyo = fecha.getFullYear().toString().padStart(4, "0");
                resultado = `${anyo}-${mes}`;
                break;
            case "dia":
                mes2=fecha.getMonth() + 1; 
                mes = mes2.toString().padStart(2, "0");
                anyo = fecha.getFullYear().toString().padStart(4, "0");
                dia = fecha.getDate().toString().padStart(2, "0");
                resultado = `${anyo}-${mes}-${dia}`;
                break;
            case "anyo":
                resultado = fecha.getFullYear().toString().padStart(4, "0");
                break;
            default:
                mes2=fecha.getMonth() + 1; 
                mes = mes2.toString().padStart(2, "0");
                anyo = fecha.getFullYear().toString().padStart(4, "0");
                dia = fecha.getDate().toString().padStart(2, "0");
                resultado = `${mes}-${anyo}-${dia}`;
                break;
        }
        return resultado;

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
function borrarGasto(idGasto) {
    for (let i = 0; i < gastos.length; i++) {
        let gasto = gastos[i];
        if (gasto.id == idGasto) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let sumaGastos = 0;
    for (let i = 0; i < gastos.length; i++) {

        sumaGastos = sumaGastos + gastos[i].valor;
    }

    return sumaGastos;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(objeto) {
    // Creamos una copia del objeto gastos para poder filtrar sobre él.
    let copiaGastos = gastos.slice();
    // debugger;
    if (Object.keys(objeto).length !== 0) {
        if (objeto.fechaDesde) {
            copiaGastos = copiaGastos.filter(x => x.fecha >= Date.parse(objeto.fechaDesde));
        }
        if (objeto.fechaHasta) {
            copiaGastos = copiaGastos.filter(x => x.fecha <= Date.parse(objeto.fechaHasta));
        }
        if (objeto.valorMinimo) {
            copiaGastos = copiaGastos.filter(x => x.valor >= objeto.valorMinimo);
        }
        if (objeto.valorMaximo) {
            copiaGastos = copiaGastos.filter(x => x.valor <= objeto.valorMaximo);
        }
        if (objeto.descripcionContiene) {
            copiaGastos = copiaGastos.filter(x => x.descripcion.includes(objeto.descripcionContiene));
        }
        if (objeto.etiquetasTiene) {
            copiaGastos = copiaGastos.filter(x => {
                for (let etiqueta of x.etiquetas) {
                    if (objeto.etiquetasTiene.indexOf(etiqueta) > -1) {
                        return x;
                    }
                }
            });
        }
    }
    return copiaGastos;

}

function agruparGastos(periodo,etiquetas,fechaDesde,fechaHasta) {
debugger;
    let gastos = filtrarGastos({fechaDesde:fechaDesde,fechaHasta:fechaHasta,etiquetasTiene:etiquetas}).reduce((sum,current) =>{
        debugger;
        let periodoAct = current.obtenerPeriodoAgrupacion(periodo);
        if(!sum[periodoAct]){
            sum[periodoAct]=0;
        }
        sum[periodoAct]+=current.valor;
        return sum;
    },{});
    return gastos;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    anyadirGasto,
    listarGastos,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
