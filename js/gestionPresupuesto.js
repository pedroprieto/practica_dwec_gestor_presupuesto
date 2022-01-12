'use strict'
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


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
        let mes, dia, anyo = "";
        let mes2;
        switch (agrupacion) {
            case "mes":
                mes2 = fecha.getMonth() + 1;
                mes = mes2.toString().padStart(2, "0");
                anyo = fecha.getFullYear().toString().padStart(4, "0");
                resultado = `${anyo}-${mes}`;
                break;
            case "dia":
                mes2 = fecha.getMonth() + 1;
                mes = mes2.toString().padStart(2, "0");
                anyo = fecha.getFullYear().toString().padStart(4, "0");
                dia = fecha.getDate().toString().padStart(2, "0");
                resultado = `${anyo}-${mes}-${dia}`;
                break;
            case "anyo":
                resultado = fecha.getFullYear().toString().padStart(4, "0");
                break;
            default:
                mes2 = fecha.getMonth() + 1;
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
    debugger;
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
    return gastos.filter(function (gasto) {
        let resultado = true;
        if (objeto.fechaDesde) {
            if (gasto.fecha < Date.parse(objeto.fechaDesde)) {
                resultado = false;
            }
        }

        if (objeto.fechaHasta) {
            if (gasto.fecha > Date.parse(objeto.fechaHasta)) {
                resultado = false;
            }
        }

        if (objeto.valorMinimo) {
            if (gasto.valor < objeto.valorMinimo) {
                resultado = false;
            }
        }

        if (objeto.valorMaximo) {
            if (gasto.valor > objeto.valorMaximo) {
                resultado = false;
            }
        }

        if (objeto.descripcionContiene) {
            if (!gasto.descripcion.includes(objeto.descripcionContiene)) {
                resultado = false;
            }
        }
        if (objeto.etiquetasTiene) {
            let contadorEtiquetas = 0;
            for (let etiqueta of objeto.etiquetasTiene) {
                if (gasto.etiquetas.indexOf(etiqueta) > -1) {
                    contadorEtiquetas++;
                }
            }
            if (contadorEtiquetas == 0){
                resultado = false;
            }
        }
        return resultado;
    })

}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta) {
    let gastos = filtrarGastos({ fechaDesde: fechaDesde, fechaHasta: fechaHasta, etiquetasTiene: etiquetas }).reduce((sum, current) => {
        let periodoAct = current.obtenerPeriodoAgrupacion(periodo);
        if (!sum[periodoAct]) {
            sum[periodoAct] = 0;
        }
        sum[periodoAct] += current.valor;
        return sum;
    }, {});
    return gastos;
}


function transformarListadoEtiquetas(listaEtiquetas){ 
    let regexp = /\w*[^;,.:\s]/gm;
    let result = listaEtiquetas.match(regexp) || [];
    return result;
}

// function cargarGastos(gastosAlmacenar){
//     debugger;
//     gastos = gastosAlmacenar;
//     return gastos;
// }
function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas
  
    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"
          
        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado)
    }
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
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
