// ----------------  VARIABLES GLOBALES   -------------------------------
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

// ----------------  FUNCIONES  -------------------------------
function actualizarPresupuesto(nuevoPresupuesto) {
    return nuevoPresupuesto >= 0 && !isNaN(nuevoPresupuesto) ? presupuesto = nuevoPresupuesto : -1;
}
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}
function listarGastos(){
    return gastos;
}


// ----------------  OBJETOS GASTO Y SUS METODOS  --------------
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = !isNaN(valor) && valor > 0 ? valor : 0;
    

    // ----------------  METODOS  ------------------------------
    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }
    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function(nuevoValor){
        this.valor = !isNaN(nuevoValor) && nuevoValor > 0 ? nuevoValor: this.valor;
    }
}


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
