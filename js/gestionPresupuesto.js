// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(num) {
    // TODO
    if (num >= 0) {
        presupuesto = num;
        return presupuesto;
    } else {
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    let mensaje = `Tu presupuesto actual es de ${presupuesto} €`;
    return mensaje;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    //TODO
    // Propiedades
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;

    let f = Date.parse(fecha);
    if (f) {
        this.fecha = f;
    } else {
        this.fecha = Date.parse(new Date());
    }

    this.etiquetas = [];
    this.anyadirEtiquetas = function (...listaEtiquetas) {
        for (let e of listaEtiquetas) {
            if (this.etiquetas.indexOf(e) == -1) {
                this.etiquetas.push(e);
            }
        }
    }

    this.anyadirEtiquetas(...etiquetas);

    // Métodos
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function (nuevoValor) {
        this.valor = (nuevoValor >= 0) ? nuevoValor : this.valor;
    }

    this.mostrarGastoCompleto = function () {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`

        for (let e of this.etiquetas) {
            texto += `- ${e}\n`
        }
        return texto;

    };

    this.actualizarFecha = function (fecha) {
        let f = Date.parse(fecha);

        if (f) {
            this.fecha = f;
        }
    }

    this.borrarEtiquetas = function (...listaEtiquetas) {
        let nuevaListaEtiquetas = [];

        for (let e of this.etiquetas) {
            if (listaEtiquetas.indexOf(e) == -1) {
                nuevaListaEtiquetas.push(e);
            }
        }

        this.etiquetas = nuevaListaEtiquetas;
    }

    this.obtenerPeriodoAgrupacion = function (periodo) {
        switch (periodo) {
            case "mes":
                return fecha.slice(0, 7);
            case "anyo":
                return fecha.slice(0, 4);
            case "dia":
                return fecha;
        }
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto++;
    gastos.push(gasto)
}

function borrarGasto(idGasto) {
    let gasto = null;

    for (let g of gastos) {
        if (g.id == idGasto) {
            gasto = g;
            break;
        }
    }
    if (gasto) {
        let posGasto = gastos.indexOf(gasto);
        gastos.splice(posGasto, 1);
    }
}

function calcularTotalGastos() {
    let total = 0;

    for (let g of gastos) {
        total += g.valor;
    }

    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtros) {
    
    return gastos.filter(gasto => {
        
        // Filtrar por rango de fechas
        if (filtros.fechaDesde && new Date(gasto.fecha) < new Date(filtros.fechaDesde)) {
            return false;
        }
        if (filtros.fechaHasta && new Date(gasto.fecha) > new Date(filtros.fechaHasta)) {
            return false;
        }

        // Filtrar por valor mínimo y máximo
        if (filtros.valorMinimo && gasto.valor < filtros.valorMinimo) {
            return false;
        }
        if (filtros.valorMaximo && gasto.valor > filtros.valorMaximo) {
            return false;
        }

        // Filtrar por texto en descripción
        if (filtros.descripcionContiene && !gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase())) {
            return false;
        }

        // Filtrar por etiquetas
        if (filtros.etiquetasTiene && filtros.etiquetasTiene.length > 0) {
            
            let etiquetasMin = filtros.etiquetasTiene.map(etiqueta => etiqueta.toLowerCase());
            
            let tieneEtiqueta = false;
            
            for (let etiquetaGasto of gasto.etiquetas) {
                if (etiquetasMin.includes(etiquetaGasto.toLowerCase())) {
                    tieneEtiqueta = true;
                    break; // Si encuentra una etiqueta válida, termina el bucle
                }
            }
            
            if (!tieneEtiqueta) {
                return false; // Si no encuentra ninguna etiqueta válida, excluye el gasto
            }
        }

        return true; // Si pasa todas las condiciones, incluye el gasto
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