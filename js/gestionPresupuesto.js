
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
