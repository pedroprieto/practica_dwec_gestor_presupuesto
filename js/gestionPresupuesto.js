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
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}
function borrarGasto(idgasto){
    let posicion = gastos.findIndex(gasto => gasto.id === idgasto);
    gastos.splice(posicion, 1);
}
function calcularTotalGastos(){
    let sumaGastosTotales = gastos.reduce((acumulador, gasto) => acumulador + gasto.valor, 0);
    return sumaGastosTotales;
}
function calcularBalance(){
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}


// ----------------  OBJETOS GASTO Y SUS METODOS  --------------
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = !isNaN(valor) && valor > 0 ? valor : 0;
    // se comprueba si la fecha existe y tambien se comprueba que no sea nula o indefinida
    this.fecha = fecha && Date.parse(fecha) ? Date.parse(fecha) : Date.now();
    this.etiquetas = etiquetas ? etiquetas : [];

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
    this.mostrarGastoCompleto = function(){
        let fechaLocal = new Date(this.fecha).toLocaleString(); 
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`;
        texto += `\nFecha: ${fechaLocal}`;
        texto += `\nEtiquetas:\n`;
        for (let etiqueta of this.etiquetas){
            texto += `- ${etiqueta}\n`;
        }
        return texto
    }
    this.actualizarFecha = function(nuevaFecha){
        this.fecha = nuevaFecha && Date.parse(nuevaFecha) ? Date.parse(nuevaFecha) : this.fecha;
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
