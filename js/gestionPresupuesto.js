// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(actualizarPres) {
    // TODO
    if (actualizarPres >= 0) {
        presupuesto = actualizarPres;
        return actualizarPres;
    } else {
        let mensErr = "Error el valor del Presupuesto es ";
        return mensErr, -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function (actualizarDescrip) {
        this.descripcion = actualizarDescrip;
    }
    this.actualizarValor = function (actualizarVal) {
        //Repasando las lecciones lo he abreviado con el condicional ?.
        this.valor = (actualizarVal >= 0) ? actualizarVal : this.valor;
    }
    this.mostrarGastoCompleto = function () {
        //Problemas con representar la variable textocompleto, porque me daba error porque no estaba el texto igual 
        //de organizado que el de la solución. Fecha y Etiquetas lo tenia con unos TABS y eso detectaba el error.
        let textocompleto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`
        for (let x of this.etiquetas) {
            //Lista en Forma de Lista todos los datos del Array Etiquetas.
            textocompleto += `- ${x}\n`
        }
        return textocompleto;
    };

    this.actualizarFecha = function (fecha) {
        let actFe = Date.parse(fecha);
        if (actFe) {
            this.fecha = actFe;
        }
    }

    this.anyadirEtiquetas = function (...etqs) {
        for (let actEti of etqs) {
            //El -1 es para que siempre empieze a contar el array desde el principio, sin 
            //modificar ningún valor del Array.
            if (this.etiquetas.indexOf(actEti) == -1) {
                this.etiquetas.push(actEti);
            }
        }
    }

    this.borrarEtiquetas = function (...etqs) {
        let arrEti = [];
        for (let e of this.etiquetas) {
            if (etqs.indexOf(e) == -1) {
                arrEti.push(e);
            }
        }

        this.etiquetas = arrEti;

    }
    this.obtenerPeriodoAgrupacion = function (periodo) {
        //Nueva variable para almacenar la this.fecha que el la del return GastosCompletos
        let pA = new Date(this.fecha);
        //Condicionales para cada tipo de petición (¿Se puede mejorar con un bucle?)
        if (periodo == "mes") {
            //La fecha se muestra en formato ISO "aaaa-mm-ddThh:mm:ss.sssZ"
            let fechaISO = pA.toISOString();
            //Solo se han de coger los caracteres necesarios y por eso los corto con Slice.
            return fechaISO.slice(0, 7);
        }
        if (periodo == "anyo") {
            let fechaISO = pA.toISOString();
            return fechaISO.slice(0, 4);
        }
        if (periodo == "dia") {
            let fechaISO = pA.toISOString();
            return fechaISO.slice(0, 10);
        }
    }

    this.descripcion = descripcion;
    //Repasando las lecciones lo he abreviado con el condicional ?.
    this.valor = (valor >= 0) ? valor : 0;
    this.etiquetas = [];
    this.anyadirEtiquetas(...etiquetas);
    let feactual = Date.parse(fecha);
    if (feactual) {
        this.fecha = feactual;
    } else {
        this.fecha = Date.parse(new Date());
    }
}

function listarGastos() {
    return gastos;
}
function anyadirGasto(gasto) {
    gasto.id = idGasto++;
    gastos.push(gasto);
}
function borrarGasto(idGasto) {
    let gasto = null;
    for (let borrgasto of gastos) {
        if (borrgasto.id == idGasto) {
            gasto = borrgasto;
        }
    }
    //Me ha costado sacarlo porque no sabia la función splice de los arrays.
    if (gasto) {
        let gastoborrado = gastos.indexOf(gasto);
        gastos.splice(gastoborrado, 1);
    }
}
function calcularTotalGastos() {
    let total = 0
    for (let gastosTo of gastos) {
        //Suma todo los valores del array Gastos.
        total += gastosTo.valor;
    }
    return total;
}
function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}
function filtrarGastos(filtro) {
    return gastos.filter((gast) => {
        // Inicializamos como válido por defecto
        let ok = true;
        // Filtrar por fechaDesde si se proporciona
        if (filtro.fechaDesde) {
            let fechaDesde = Date.parse(filtro.fechaDesde);
            ok = ok && (gast.fecha >= fechaDesde);
        }
        // Filtrar por fechaHasta si se proporciona
        if (filtro.fechaHasta) {
            let fechaHasta = Date.parse(filtro.fechaHasta);
            ok = ok && (gast.fecha <= fechaHasta);
        }
        // Filtrar por valorMinimo si se proporciona
        if (filtro.valorMinimo) {
            ok = ok && (gast.valor >= filtro.valorMinimo);
        }
        // Filtrar por valorMaximo si se proporciona
        if (filtro.valorMaximo) {
            ok = ok && (gast.valor <= filtro.valorMaximo);
        }
        // Filtrar por descripcionContiene si se proporciona
        if (filtro.descripcionContiene) {
            ok = ok && gast.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase());
        }
        // Filtrar por etiquetasTiene si se proporciona
        if (filtro.etiquetasTiene) {
            let etiQue = false; // Inicializa una variable para rastrear si se ha encontrado alguna etiqueta
            for (let eti of filtro.etiquetasTiene) {
                // Convierte la etiqueta del filtro y la etiqueta actual a minúsculas
                const etiquetaFiltro = eti.toLowerCase();
                // Utiliza el método some para verificar si al menos una etiqueta en las etiquetas del gasto coincide
                if (gast.etiquetas.some(etiqueta => etiqueta.toLowerCase() === etiquetaFiltro)) {
                    etiQue = true; // Si se encuentra al menos una coincidencia, establece etiQue en true
                    break; // Terminar el bucle una vez que se encuentra una coincidencia
                }
            }
            ok = ok && etiQue; // Actualiza el resultado general con la condición de las etiquetas
        }

        return ok;
    })

}
function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    // Llamar a filtrarGastos para obtener el subconjunto de gastos
    let filtrados = filtrarGastos({ etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta });
    // Inicializar el acumulador como un objeto vacío
    let acumulador = {};

    // Utilizar reduce para agrupar los gastos por período
    filtrados.reduce((acc, gasto) => {
        // Obtener el período de agrupación utilizando el método obtenerPeriodoAgrupacion del gasto
        let per = gasto.obtenerPeriodoAgrupacion(periodo);
        // Sumar el valor del gasto al período correspondiente en el acumulador
        // Si el período no existe en el acumulador, se inicializa con el valor del gasto, de lo contrario se suma al valor existente
        acc[per] = (acc[per] || 0) + gasto.valor;

        return acc;// Devolver el objeto acumulador actualizado para la siguiente iteración
    }, acumulador);

    return acumulador;

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
