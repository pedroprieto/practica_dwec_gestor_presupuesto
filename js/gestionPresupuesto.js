// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    if (nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        console.log("Error: el valor introducido no es correcto.");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
       
    this.descripcion = descripcion;
    this.valor = (valor >= 0) ? valor : 0;
    this.fecha = Date.parse(fecha) ? Date.parse(fecha) : new Date().getTime();
    this.etiquetas = etiquetas ?? new Array();
    
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
        if (nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    this.mostrarGastoCompleto = function() {
        let gastoCompleto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        gastoCompleto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        gastoCompleto += `Etiquetas:\n`;

        for (let etiqueta of this.etiquetas) {
            gastoCompleto += `- ${etiqueta}\n`;
        }

        return gastoCompleto;
    };

    this.actualizarFecha = function(fecha) {
        if (Date.parse(fecha)) {
            this.fecha = Date.parse(fecha);
        }
    };

    this.anyadirEtiquetas = function(...etiquetasNuevas) {
        for (let etiqueta of etiquetasNuevas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    this.borrarEtiquetas = function(...etiquetasNuevas) {
        for (let etiqueta of etiquetasNuevas) {
            if (this.etiquetas.includes(etiqueta)) {
                this.etiquetas.splice(this.etiquetas.indexOf(etiqueta), 1);
            }
        }
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

function borrarGasto(id) {
    let idBorrar = gastos.findIndex(gasto => gasto.id == id);

    if (idBorrar !== undefined) {
        gastos.splice(idBorrar, 1);
    }
}

function calcularTotalGastos() {
    return gastos.reduce((suma, gasto) => suma + gasto.valor, 0);
}

function calcularBalance() {
    return (presupuesto - calcularTotalGastos());
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
    calcularBalance
}
