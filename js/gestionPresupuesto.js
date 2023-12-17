// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


//Funciones
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
    // Busca el índice del gasto con el id proporcionado
    let indice = gastos.findIndex(gasto => gasto.id === id);
    // Si se encuentra el gasto, elimínalo
    if (indice != -1) {
        gastos.splice(indice, 1);
    }
}
function calcularTotalGastos() {
    let suma = 0;
    for (let g of gastos) {
        suma += g.valor;
    }
    return suma;
}
function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    //propiedades
    this.descripcion = descripcion;
    this.valor = typeof(valor)==='number' && valor >= 0 ? valor : 0;
    this.etiquetas = etiquetas.length > 0 ? etiquetas : [];
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
