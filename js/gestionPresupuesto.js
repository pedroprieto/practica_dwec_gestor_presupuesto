// TODO: Crear las funciones, objetos y variables indicadas en el enunciado



let presupuesto;
presupuesto = 0;

let gastos;
gastos = [];

let idGasto;
idGasto = 0;







function actualizarPresupuesto(valor) {
    
    if (valor >= 0) {
    
        presupuesto = valor;
        return presupuesto;
    } 
    else {
        console.log("La cantidad introducida no es valida");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
    this.descripcion = descripcion;
    this.etiquetas = [];
    this.fecha = fecha;
    
    
    
    if(valor >= 0) {
        this.valor = valor;

    } else {
        this.valor = 0;
    }

    if(fecha)
    {
        fecha = Date.parse(fecha);
    }
    else {
        fecha = Date.now();
    }
    
    
    this.mostrarGasto = function() {
        let gasto = (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
       
        return gasto;
    }

    this.actualizarDescripcion = function (descripcionAct) {
    
        this.descripcion = descripcionAct;
    }

    this.actualizarValor = function(valorAct) {
    
        if (valorAct >= 0) 
        {
            this.valor = valorAct;
        }
    }

}
function listarGastos() {

    return gastos;
}
function anyadirGasto(gasto) {

    gasto.id = idGasto;
    idGasto = idGasto++;
    gastos.push(gasto);
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
