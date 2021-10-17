// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

//Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(x) {

    if (x >= 0)
    { 
        presupuesto = x;
        return x;
    }
    else
    {
        x = -1
        return x;
    }
}

function mostrarPresupuesto() {
    // TODO
    let x = presupuesto;
    return `Tu presupuesto actual es de ${x} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO


    
    this.descripcion = descripcion;

    if (valor >= 0)
    {
        this.valor = valor;
    } 
    else
    {
        this.valor = 0;
    }

    if (fecha)
    {
        fecha = Date.parse(fecha);
        this.fecha = fecha;
    }
    else
    {
        fecha = Date.now();
        this.fecha = fecha;
    }

    this.etiquetas = (etiquetas.length === 0) ? etiquetas = [] : etiquetas;

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`
    };

    this.actualizarDescripcion = function(nuevadesc) {
        this.descripcion = nuevadesc;
    }

    this.actualizarValor = function(nuevovalor) {
        if (nuevovalor >= 0)
        {
            this.valor = nuevovalor;
        }
    }
}
function listarGastos() {
        return gastos;
}

function anyadirGasto() {

}
function borrarGasto() {

}
function calcularTotalGastos() {

}
function calcularBalance() {
    
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
